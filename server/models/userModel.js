const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone is required']
    },
    userType: {
      type: String,
      required: [true, 'UserType is required'],
      default: 'Ordinary',
      enum: ['Ordinary', 'Admin', 'customer', 'admin']
    },
    gender: {
      type: String,
      default: ''
    },
    age: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);

