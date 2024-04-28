const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema(
  {
    id_emp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: [true, 'startDate required'],
    },
    endDate: {
      type: Date,
      required: [true, 'endDate required'],
    },
    cause: {
      type: String,
      trim: true,
      required: [true, 'cause required'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

module.exports = LeaveRequest;
