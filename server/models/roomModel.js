const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: [true, 'Room number is required']
    },
    count: {
      type: Number,
      required: [true, 'Max capacity / count is required'],
      default: 2
    },
    rent: {
      type: Number,
      required: [true, 'Rent is required']
    },
    type: {
      type: String,
      required: [true, 'Room type is required']
    },
    photos: {
      type: [String],
      default: []
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    currentbooking: [
      {
        bookingid: { type: String },
        fromdate: { type: String },
        todate: { type: String },
        userid: { type: String },
        status: { type: String, default: 'booked' }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Room', roomSchema);

