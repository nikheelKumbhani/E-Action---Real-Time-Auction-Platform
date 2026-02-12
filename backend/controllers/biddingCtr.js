const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
const BiddingProduct = require("../model/biddingProductModel");
const sendEmail = require("../utils/sendEmail");
const User = require("../model/userModel");

const placeBid = asyncHandler(async (req, res) => {
  try {
    const { ProductId, productId, price } = req.body;
    const finalProductId = productId || ProductId; // Handle case mismatch
    const userId = req.user._id;

    if (!finalProductId || !price) {
      return res.status(400).json({ message: "Product ID and price are required." });
    }

    const product = await Product.findById(finalProductId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Changed from isverify to isPublished since that's the correct field name
    if (!product.isPublished) {
      return res.status(400).json({ message: "Bidding is not allowed for this product yet." });
    }

    if (product.isSoldout) {
      return res.status(400).json({ message: "Bidding is closed for this product." });
    }

    // Check if bid end date has passed
    if (product.bidEndDate && new Date(product.bidEndDate) < new Date()) {
      return res.status(400).json({ message: "Bidding period has ended for this product." });
    }

    // Check if user is trying to bid on their own product
    if (product.user.toString() === userId) {
      return res.status(400).json({ message: "You cannot bid on your own product." });
    }

    // Check user balance
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.balance < price) {
      return res.status(400).json({ message: "Insufficient balance to place this bid." });
    }

    // Get highest bid for bid amount validation
    const highestBid = await BiddingProduct.findOne({ product: finalProductId }).sort({ price: -1 });

    // Consistent 5% minimum increase for all bids
    if (!highestBid) {
      // First bid must be at least 5% higher than base price
      const minimumFirstBid = product.basePrice * 1.05;
      if (price < minimumFirstBid) {
        return res.status(400).json({
          message: `First bid must be at least 5% higher than product price. Minimum bid required: ${minimumFirstBid.toFixed(2)}`
        });
      }
    } else {
      // Subsequent bids must be at least 5% higher than current highest bid
      const minimumNextBid = highestBid.price * 1.05;
      if (price <= minimumNextBid) {
        return res.status(400).json({
          message: `New bid must be at least 5% higher than current highest bid. Minimum bid required: ${minimumNextBid.toFixed(2)}`
        });
      }
    }

    let existingUserBid = await BiddingProduct.findOne({ user: userId, product: finalProductId });
    if (existingUserBid) {
      // User is updating their existing bid
      const oldBidAmount = existingUserBid.price;
      const priceDifference = price - oldBidAmount;

      // Check if user has enough balance for the difference
      if (priceDifference > 0 && user.balance < priceDifference) {
        return res.status(400).json({
          message: `Insufficient balance. You need ${priceDifference} more to update your bid.`
        });
      }

      // Refund old bid amount and deduct new bid amount
      user.balance += oldBidAmount; // Refund old bid
      user.balance -= price; // Deduct new bid

      // Update transaction history
      user.transactions = user.transactions || [];
      user.transactions.push({
        type: 'withdrawal',
        amount: price,
        date: new Date(),
        description: `Updated bid for product ${product.title}`
      });

      await user.save();

      existingUserBid.price = price;
      await existingUserBid.save();

      // Update product's currentHighestBid
      await Product.findByIdAndUpdate(finalProductId, {
        currentHighestBid: price
      });

      return res.status(200).json({
        message: "Bid updated successfully.",
        biddingProduct: existingUserBid,
        newBalance: user.balance
      });
    }

    // New bid - deduct the full amount from user balance
    user.balance -= price;

    // Add transaction record
    user.transactions = user.transactions || [];
    user.transactions.push({
      type: 'withdrawal',
      amount: price,
      date: new Date(),
      description: `Placed bid for product ${product.title}`
    });

    await user.save();

    const newBid = new BiddingProduct({ user: userId, product: finalProductId, price });
    await newBid.save();

    // Update product's currentHighestBid
    await Product.findByIdAndUpdate(finalProductId, {
      currentHighestBid: price
    });

    return res.status(201).json({
      message: "Bid placed successfully.",
      biddingProduct: newBid,
      newBalance: user.balance
    });
  } catch (error) {
    console.error("Error placing bid:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

const getBiddingHistory = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const biddingHistory = await BiddingProduct.find({ product: productId }).sort("-createdAt").populate("user").populate("product");

  // console.log(biddingHistory);
  res.status(200).json(biddingHistory);
});

const sellProduct = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  // Find the product
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }



  // Check if the user is authorized to sell the product
  if (product.user.toString() !== userId) {
    return res.status(403).json({ error: "You do not have permission to sell this product" });
  }

  // Find the highest bid
  const highestBid = await BiddingProduct.findOne({ product: productId }).sort({ price: -1 }).populate("user");
  if (!highestBid) {
    return res.status(400).json({ error: "No winning bid found for the product" });
  }

  // Calculate commission and final price
  const commissionRate = product.commission;
  const commissionAmount = (commissionRate / 100) * highestBid.price;
  const finalPrice = highestBid.price - commissionAmount;

  // Update product details
  product.isSoldout = true;
  product.soldTo = highestBid.user;
  product.soldPrice = finalPrice;

  // Update admin's commission balance
  const admin = await User.findOne({ role: "admin" });
  if (admin) {
    admin.commissionBalance += commissionAmount;
    await admin.save();
  }

  // Update seller's balance
  const seller = await User.findById(product.user);
  if (seller) {
    seller.balance += finalPrice; // Add the remaining amount to the seller's balance
    seller.transactions = seller.transactions || [];
    seller.transactions.push({
      type: 'deposit',
      amount: finalPrice,
      date: new Date(),
      description: `Sale of product: ${product.title}`
    });
    await seller.save();
  } else {
    return res.status(404).json({ error: "Seller not found" });
  }

  // Refund all losing bidders (everyone except the winner)
  const allBids = await BiddingProduct.find({ product: productId }).populate('user');

  for (const bid of allBids) {
    // Skip the winning bid - winner's money stays locked until they receive the product
    if (bid._id.toString() === highestBid._id.toString()) {
      continue;
    }

    // Refund the losing bidder
    const losingBidder = await User.findById(bid.user._id);
    if (losingBidder) {
      losingBidder.balance += bid.price;
      losingBidder.transactions = losingBidder.transactions || [];
      losingBidder.transactions.push({
        type: 'deposit',
        amount: bid.price,
        date: new Date(),
        description: `Refund for losing bid on: ${product.title}`
      });
      await losingBidder.save();
    }
  }

  // Save product
  await product.save();

  // Send email notification to the highest bidder
  await sendEmail({
    email: highestBid.user.email,
    subject: "Congratulations! You won the auction!",
    text: `You have won the auction for "${product.title}" with a bid of $${highestBid.price}.`,
  });

  res.status(200).json({ message: "Product has been successfully sold!" });
});

module.exports = {
  placeBid,
  getBiddingHistory,
  sellProduct,
};
