const express = require("express");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductBySlug,
  getAllProductsByAmdin,
  deleteProductsByAmdin,
  getAllSoldProducts,
  verifyAndAddCommissionProductByAmdin,
  getAllProductsofUser,
  getWonProducts,
} = require("../controllers/productCtr");
const { sellProduct } = require("../controllers/biddingCtr");
const { upload } = require("../utils/fileUpload");
const { protect, isSeller, isAdmin } = require("../middleWare/authMiddleWare");
const router = express.Router();

router.post("/", protect, isSeller, upload.array("images", 5), createProduct);
router.delete("/:id", protect, isSeller, deleteProduct);
router.put("/:id", protect, isSeller, upload.array("images", 5), updateProduct);

router.get("/", getAllProducts);
router.get("/user", protect, getAllProductsofUser);
router.get("/won-products", protect, getWonProducts);
router.get("/sold", getAllSoldProducts);
router.get("/:id", getProductBySlug);

router.post("/sell", protect, sellProduct);

// Only access for admin users
router.patch("/admin/product-verified/:id", protect, isAdmin, verifyAndAddCommissionProductByAmdin);
router.get("/admin/products", protect, isAdmin, getAllProductsByAmdin);
router.delete("/admin/products", protect, isAdmin, deleteProductsByAmdin);

module.exports = router;
