const express = require("express");
const router = express.Router();
const { registerUser, loginUser, loginStatus, logoutUser, loginAsSeller, estimateIncome, getUser, getUserBalance, getAllUser, deposit, withdraw, deleteUser, getUserById } = require("../controllers/userCtr");
const { protect, isAdmin } = require("../middleWare/authMiddleWare");



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/loggedin", loginStatus);
router.post("/logout", logoutUser);
router.post("/seller", loginAsSeller);
router.get("/getuser", protect, getUser);
router.get("/sell-amount", protect, getUserBalance);

router.get("/estimate-income", protect, isAdmin, estimateIncome);
router.get("/users", protect, isAdmin, getAllUser);

router.post("/deposit", protect, deposit);
router.post("/withdraw", protect, withdraw);

router.delete("/delete/:id", protect, isAdmin, deleteUser);

router.get("/user/:id", protect, isAdmin, getUserById);

module.exports = router;
