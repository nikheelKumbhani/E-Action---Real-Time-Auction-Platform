const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Product = require("../model/productModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Please enter a valid email address");
  }

  // Convert email to lowercase for consistency
  const normalizedEmail = email.toLowerCase();

  const userExits = await User.findOne({ email: normalizedEmail });
  if (userExits) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
  });

  const token = generateToken(user._id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "lax",
    secure: false,
  });

  if (user) {
    const { _id, name, email, photo, role } = user;
    res.status(201).json({ _id, name, email, photo, token, role });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add Email and Password");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Please enter a valid email address");
  }

  // Convert email to lowercase for consistency
  const normalizedEmail = email.toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    res.status(400);
    throw new Error("User not found, Please signUp");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "lax",
    secure: false,
  });

  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, role, balance, commissionBalance } = user;
    res.status(201).json({ _id, name, email, photo, role, balance, commissionBalance, token });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const loginStatus = asyncHandler(async (req, res) => {
  try {
    let token = req.cookies.token;

    // Check Authorization header specifically for Bearer token
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      return res.json(true);
    }
    return res.json(false);
  } catch (error) {
    // Token is invalid or expired
    return res.json(false);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).json(user);
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: false,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

/* const loginAsSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add Email and Password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found, Please signUp");
  }

  const passwordIsCorrrect = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  user.role = "seller";
  user.save();
  if (user && passwordIsCorrrect) {
    const { _id, name, email, photo, role } = user;
    res.status(201).json({ _id, name, email, photo, role, token });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
}); */
const loginAsSeller = asyncHandler(async (req, res) => {
  // Get the authenticated user from the request (set by protect middleware)
  const userId = req.user._id;

  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Check if user is already a seller
  if (user.role === "seller") {
    res.status(400);
    throw new Error("You are already a seller");
  }

  // Update the role to 'seller'
  user.role = "seller";
  await user.save();

  // Generate a new token with updated user info
  const token = generateToken(user._id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "lax",
    secure: false,
  });

  // Send the response with updated user info
  const { _id, name, email, photo, role } = user;
  res.status(200).json({ _id, name, email, photo, role, token });
});

const getUserBalance = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    balance: user.balance,
  });
});

// Only for admin users
const getAllUser = asyncHandler(async (req, res) => {
  const userList = await User.find({});

  if (!userList.length) {
    return res.status(404).json({ message: "No user found" });
  }

  res.status(200).json(userList);
});

const estimateIncome = asyncHandler(async (req, res) => {
  try {
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      return res.status(404).json({ error: "Admin user not found" });
    }
    // Calculate total balance including commission
    const totalBalance = admin.balance + admin.commissionBalance;
    res.status(200).json({
      balance: admin.balance,
      commissionBalance: admin.commissionBalance,
      totalBalance: totalBalance
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deposit = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Please provide a valid amount");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.balance += Number(amount);
  user.transactions = user.transactions || [];
  user.transactions.push({
    type: "deposit",
    amount: Number(amount),
    date: new Date()
  });

  await user.save();

  res.status(200).json(user);
});

const withdraw = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Please provide a valid amount");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.balance < amount) {
    res.status(400);
    throw new Error("Insufficient funds");
  }

  user.balance -= Number(amount);
  user.transactions = user.transactions || [];
  user.transactions.push({
    type: "withdrawal",
    amount: Number(amount),
    date: new Date()
  });

  await user.save();

  res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ message: "User deleted successfully" });
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password -transactions -balance -commissionBalance");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  loginStatus,
  logoutUser,
  loginAsSeller,
  estimateIncome,
  getUser,
  getUserBalance,
  getAllUser,

  deposit,
  withdraw,
  deleteUser,
  getUserById,
};
