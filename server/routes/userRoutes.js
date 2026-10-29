const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @route   POST /api/users/signup
// @desc    Register a user (Ordinary or Admin)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone, userType, gender, age } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ msg: 'Please provide all required fields', status: 'false' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already registered', status: 'false' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      userType: userType || 'Ordinary',
      gender: gender || '',
      age: age || null
    });

    return res.status(200).json({
      msg: 'User registered successfully',
      status: 'true',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        userType: newUser.userType
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user & return token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter both email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const secret = process.env.JWT_SECRET || 'hotelpro_secret_jwt_key_2026_super_secure';
    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType, name: user.name },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      msg: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
});

// @route   GET /api/users/allusers
// @desc    Get all users (for Admin dashboard)
router.get('/allusers', async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    console.error('Fetch users error:', error);
    return res.status(500).json({ msg: 'Failed to fetch users', error: error.message });
  }
});

module.exports = router;

