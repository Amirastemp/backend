const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'firstName required'],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'lastName required'],
      },
      userName: {
        type: String,
        trim: true,
        required: [true, 'userName required'],
      },
    email: {
      type: String,
      required: [true, 'email required'],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,

    password: {
      type: String,
      required: [true, 'password required'],
      minlength: [6, 'Too short password'],
    },
    
    role: {
      type: String,
      enum: ['employee', 'director', 'RH'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
    // child reference (one to many)

  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;