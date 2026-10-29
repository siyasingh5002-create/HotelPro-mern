const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    roomid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    roomNumber: {
      type: Number
    },
    type: {
      type: String,
      required: true
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: {
      type: String,
      required: true
    },
    fromdate: {
      type: String,
      required: true
    },
    todate: {
      type: String,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    totaldays: {
      type: Number,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    cardDetails: {
      cardholdername: { type: String, required: true },
      cardnumber: { type: String, required: true },
      cvvcode: { type: String, required: true },
      expmonthyear: { type: String, required: true }
    },
    status: {
      type: String,
      default: 'booked'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);

