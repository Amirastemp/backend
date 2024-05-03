const mongoose = require('mongoose');

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
      description: {
        type: String,
        trim: true,
        required: [true, 'description required'],
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
      enum: ['employee', 'admin', 'RH','candidat'],
      default: 'employee',
    },
    active: {
      type: Boolean,
    
    },
    // child reference (one to many)
    address: {
      type: String,
    },
 
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;