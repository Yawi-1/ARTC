const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asynHandler');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      branch: user.branch, 
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const signup = asyncHandler(async (req, res) => {
  const { username, password, role, branch } = req.body;

  if (!username || !password || !branch) {
    throw new ApiError("Username, password and branch are required!", 400);
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new ApiError("Username already exists!", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    role,
    branch 
  });

  const populatedUser = await user.populate('branch', 'name');

  const token = generateToken({
    id: user._id,
    branch: user.branch._id, 
    role: user.role
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
  });

  res.status(201).json({
    message: "User created successfully!",
    data: {
      id: user._id,
      username: user.username,
      role: user.role,
      branch: populatedUser.branch.name
    }
  });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError("Username and password are required!", 400);
  }

  const user = await User.findOne({ username }).populate('branch', 'name');

  if (!user) {
    throw new ApiError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = generateToken({
    id: user._id,
    branch: user.branch._id, 
    role: user.role
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
  });

  res.status(200).json({
    message: "Login successful!",
    data: {
      id: user._id,
      username: user.username,
      role: user.role,
      branch: user.branch
    }
  });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict'
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully"
  });
});

const getMe = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id).populate('branch', 'name');

  if (!user) {
    throw new ApiError('User does not exist', 404);
  }

  res.status(200).json({
    data: {
      id: user._id,
      username: user.username,
      role: user.role,
      branch: user.branch
    }
  });
});

module.exports = {
  signup,
  login,
  logout,
  getMe
};