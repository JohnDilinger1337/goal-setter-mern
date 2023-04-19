const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Register User
// @route POST /api/users
// @acess Public

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  // Check if all fields are set
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists in database already
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists in database');
  }

  // Hash given password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Register User
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid given data');
  }
  res.json({ message: 'register user' });
});

// @desc Login User
// @route POST /api/users
// @acess Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const user = await User.findOne({ email });
  console.log(user.id, user._id);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc Get User Data
// @route GET /api/users/me
// @acess Private

const getMe = asyncHandler(async (req, res) => {
  const { _id, email, name } = await User.findById(req.user.id);

  res.status(200).json({ id: _id, email, name });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { registerUser, loginUser, getMe };
