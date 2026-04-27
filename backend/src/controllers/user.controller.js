const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asynHandler')
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs')

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      branch: user.branch, 
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}

const signup = asyncHandler(async (req, res) => {
  const { username, password, role, branch } = req.body;

  if (!username || !password) {
    throw new ApiError("Username and password are required!", 400);
  }
  const isUser = await User.findOne({ username });
  if (isUser) {
    throw new ApiError("Username already exists!", 409);
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashPassword, branch, role })
  await user.save()
  const token = generateToken({ id: user._id, branch: user.branch, role: user.role });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 1000
  });
  res.json({ message: "User added successfully!", data: { id: user._id, username, role, branch } })
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError("Username and password are required!", 400);
  }
  const isUser = await User.findOne({ username });
  if (!isUser) {
    throw new ApiError("Invalid credentials", 401);
  }
  const isCorrect = await bcrypt.compare(password, isUser.password)
  if (!isCorrect) {
    throw new ApiError("Invalid credentials", 401);
  }
  const token = generateToken({
    id: isUser._id,
    branch: isUser.branch,
    role: isUser.role
  });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 1000
  });
  res.json({ message: "Login  successfully!", data: { id: isUser._id, username: isUser.username, role: isUser.role, branch: isUser.branch, token } })
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 1000
  });

  return res.status(200).json({
    success: true,
    message: "User logged out"
  });
});

module.exports = { login, signup, logout }