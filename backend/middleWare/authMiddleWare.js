const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const protect = expressAsyncHandler(async (req, res, next) => {
  try {
    let token = req.cookies.token;

    // Check Authorization header specifically for Bearer token
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, Please Login");
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, Please Login");
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied. You are not an admin.");
  }
};

const isSeller = (req, res, next) => {
  if (req.user && (req.user.role === "seller" || req.user.role === "admin")) {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied. You are not a seller.");
  }
};

module.exports = { protect, isAdmin, isSeller };
