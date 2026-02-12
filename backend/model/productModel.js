const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    images: [{
      fileName: String,
      filePath: String,
      fileType: String,
      public_id: String
    }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category"
    },
    categoryName: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: [true, "Please add a price"],
    },
    currentHighestBid: {  // Add this field
      type: Number,
      default: 0
    },
    commission: {
      type: Number,
      default: 10
    },
    bidStartPrice: Number,
    bidEndDate: {
      type: Date,
      required: true
    },
    verifyRequest: {
      type: Boolean,
      default: false
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    quantity: {
      type: Number,
      default: 1
    },
    isPhysical: {
      type: Boolean,
      default: true
    },
    isSoldout: {
      type: Boolean,
      default: false
    },
    soldTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    soldPrice: {
      type: Number
    },
    soldAt: {
      type: Date
    },
    adminNotes: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

// Add a validation for maximum images
productSchema.path('images').validate(function (images) {
  return images.length <= 5;
}, 'Maximum 5 images are allowed');

const product = mongoose.model("Product", productSchema);
module.exports = product;
