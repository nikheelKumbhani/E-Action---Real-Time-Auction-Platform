const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
const Category = require("../model/categoryModel"); // Add this line
const slugify = require("slugify");
const BiddingProduct = require("../model/biddingProductModel");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    basePrice,
    category,
    bidEndDate,
  } = req.body;

  const userId = req.user._id;

  // Get category name
  const categoryDoc = await Category.findById(category);
  if (!categoryDoc) {
    res.status(404);
    throw new Error("Category not found");
  }

  let slug = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/, strict: true });
  let suffix = 1;
  while (await Product.findOne({ slug })) {
    slug = `${slug}-${suffix}`;
    suffix++;
  }

  if (!title || !description || !basePrice || !category || !bidEndDate) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // Handle multiple images
  let fileData = [];
  if (req.files && req.files.length > 0) {
    if (req.files.length > 5) {
      res.status(400);
      throw new Error("Maximum 5 images are allowed");
    }

    try {
      for (const file of req.files) {
        const uploadedFile = await cloudinary.uploader.upload(file.path, {
          folder: "Bidding/Product",
          resource_type: "image"
        });
        fileData.push({
          fileName: file.originalname,
          filePath: uploadedFile.secure_url,
          fileType: file.mimetype,
          public_id: uploadedFile.public_id
        });
      }
    } catch (error) {
      res.status(500);
      throw new Error("Images could not be uploaded");
    }
  }

  try {
    const product = await Product.create({
      user: userId,
      title,
      slug,
      description,
      basePrice,
      category: categoryDoc._id, // Store category ID
      categoryName: categoryDoc.title, // Store category name
      bidEndDate,
      images: fileData,
      bidStartPrice: basePrice,
      commission: 10,
      verifyRequest: false,
      isPublished: false,
      isFeatured: false,
      quantity: 1,
      isPhysical: true,
      isSoldout: false
    });

    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to create product: " + error.message);
  }
});


const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort("-createdAt").populate("user");

  const productsWithDetails = products.map(product => ({
    ...product._doc,
    biddingPrice: product.currentHighestBid || product.basePrice,
    totalBids: 0  // This will be updated below
  }));

  // Get bid counts in a single query
  const bidCounts = await BiddingProduct.aggregate([
    {
      $group: {
        _id: "$product",
        count: { $sum: 1 }
      }
    }
  ]);

  // Create a map for quick lookup
  const bidCountMap = new Map(bidCounts.map(item => [item._id.toString(), item.count]));

  // Update totalBids for each product
  productsWithDetails.forEach(product => {
    product.totalBids = bidCountMap.get(product._id.toString()) || 0;
  });

  res.status(200).json(productsWithDetails);
});

const getAllProductsofUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const products = await Product.find({ user: userId }).sort("-createdAt").populate("user");

  const productsWithDetails = await Promise.all(
    products.map(async (product) => {
      const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
      const totalBids = await BiddingProduct.countDocuments({ product: product._id });
      const biddingPrice = latestBid ? latestBid.price : product.price;

      return {
        ...product._doc,
        biddingPrice,
        totalBids
      };
    })
  );

  res.status(200).json(productsWithDetails);
});

const getWonProducts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // console.log(userId);


  const wonProducts = await Product.find({ soldTo: userId }).sort("-createdAt").populate("user");

  const productsWithPrices = await Promise.all(
    wonProducts.map(async (product) => {
      const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
      const biddingPrice = latestBid ? latestBid.price : product.price;
      return {
        ...product._doc,
        biddingPrice, // Adding the price field
      };
    })
  );

  res.status(200).json(productsWithPrices);
});

const getAllSoldProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({ isSoldout: true }).sort("-createdAt").populate("user");
  res.status(200).json(product);
});
const getProductBySlug = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  if (product.user?.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (product.image && product.image.public_id) {
    try {
      await cloudinary.uploader.destroy(product.image.public_id);
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  }

  await Product.findByIdAndDelete(id);
  res.status(200).json({ message: "Product deleted." });
});
const updateProduct = asyncHandler(async (req, res) => {
  const { title, description, basePrice, category, bidEndDate } = req.body;
  const existingImages = JSON.parse(req.body.existingImages || '[]');
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle new image uploads
  let newImages = [];
  if (req.files && req.files.length > 0) {
    try {
      for (const file of req.files) {
        const uploadedFile = await cloudinary.uploader.upload(file.path, {
          folder: "Product-Images",
          resource_type: "image",
        });
        newImages.push({
          fileName: file.originalname,
          filePath: uploadedFile.secure_url,
          fileType: file.mimetype,
          public_id: uploadedFile.public_id,
        });
      }
    } catch (error) {
      res.status(500);
      throw new Error("Images could not be uploaded");
    }
  }

  // Combine existing and new images
  const updatedImages = [...existingImages, ...newImages];

  const categoryDoc = await Category.findById(category);
  if (!categoryDoc) {
    res.status(404);
    throw new Error("Category not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      title,
      description,
      basePrice,
      category,
      categoryName: categoryDoc.title,
      bidEndDate,
      images: updatedImages,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

// for admin only users
const verifyAndAddCommissionProductByAmdin = asyncHandler(async (req, res) => {
  const { commission, isPublished, isFeatured, bidEndDate, adminNotes } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Update product fields if they are provided in the request
  if (commission !== undefined) product.commission = commission;
  if (isPublished !== undefined) product.isPublished = isPublished;
  if (isFeatured !== undefined) product.isFeatured = isFeatured;
  if (bidEndDate !== undefined) product.bidEndDate = new Date(bidEndDate);
  if (adminNotes !== undefined) product.adminNotes = adminNotes;

  // If product is being published, set verifyRequest to false since it's been handled
  if (isPublished) {
    product.verifyRequest = false;
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product
  });
});

const getAllProductsByAmdin = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort("-createdAt").populate("user");

  const productsWithPrices = await Promise.all(
    products.map(async (product) => {
      const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
      const biddingPrice = latestBid ? latestBid.price : product.price;
      return {
        ...product._doc,
        biddingPrice, // Adding the price field
      };
    })
  );

  res.status(200).json(productsWithPrices);
});

// dot not it
const deleteProductsByAmdin = asyncHandler(async (req, res) => {
  try {
    const { productIds } = req.body;

    const result = await Product.findOneAndDelete({ _id: productIds });

    res.status(200).json({ message: `${result.deletedCount} products deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = {
  createProduct,
  getAllProducts,
  getWonProducts,
  getProductBySlug,
  deleteProduct,
  updateProduct,
  verifyAndAddCommissionProductByAmdin,
  getAllProductsByAmdin,
  deleteProductsByAmdin,
  getAllSoldProducts,
  getAllProductsofUser,

};
