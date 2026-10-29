const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

// @route   POST /api/bookings/bookroom
// @desc    Book a room
router.post('/bookroom', async (req, res) => {
  try {
    const {
      roomid,
      roomNumber,
      type,
      userid,
      username,
      fromdate,
      todate,
      totalAmount,
      totaldays,
      phone,
      cardDetails
    } = req.body;

    if (!roomid || !userid || !fromdate || !todate || !cardDetails) {
      return res.status(400).json({ msg: 'Missing required booking information' });
    }

    const newBooking = new Booking({
      roomid,
      roomNumber: roomNumber || 101,
      type,
      userid,
      username,
      fromdate,
      todate,
      totalAmount,
      totaldays,
      phone,
      cardDetails: {
        cardholdername: cardDetails.cardholdername,
        cardnumber: cardDetails.cardnumber ? cardDetails.cardnumber.slice(-4).padStart(16, '*') : '**** **** **** 1234',
        cvvcode: '***',
        expmonthyear: cardDetails.expmonthyear
      },
      status: 'booked'
    });

    const savedBooking = await newBooking.save();

    // Update Room's currentbooking array
    const room = await Room.findById(roomid);
    if (room) {
      room.currentbooking.push({
        bookingid: savedBooking._id.toString(),
        fromdate,
        todate,
        userid: userid.toString(),
        status: 'booked'
      });
      await room.save();
    }

    return res.status(200).json({
      msg: 'Room booked successfully',
      booking: savedBooking
    });
  } catch (error) {
    console.error('Error booking room:', error);
    return res.status(500).json({ msg: 'Booking failed', error: error.message });
  }
});

// @route   POST /api/bookings/getbookingsbyuserid
// @desc    Get all bookings for a user
router.post('/getbookingsbyuserid', async (req, res) => {
  try {
    const { userid } = req.body;
    if (!userid) {
      return res.status(400).json({ msg: 'User ID is required' });
    }

    const bookings = await Booking.find({ userid }).sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting bookings:', error);
    return res.status(500).json({ msg: 'Failed to retrieve bookings', error: error.message });
  }
});

// @route   POST /api/bookings/cancelbooking
// @desc    Cancel a booking
router.post('/cancelbooking', async (req, res) => {
  try {
    const { bookingid, roomid } = req.body;
    if (!bookingid) {
      return res.status(400).json({ msg: 'Booking ID is required' });
    }

    const booking = await Booking.findById(bookingid);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Update Room currentbooking list
    const targetRoomId = roomid || booking.roomid;
    if (targetRoomId) {
      const room = await Room.findById(targetRoomId);
      if (room) {
        room.currentbooking = room.currentbooking.map((b) => {
          if (b.bookingid === bookingid || (b._id && b._id.toString() === bookingid)) {
            b.status = 'cancelled';
          }
          return b;
        });
        await room.save();
      }
    }

    return res.status(200).json({ msg: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return res.status(500).json({ msg: 'Failed to cancel booking', error: error.message });
  }
});

// @route   GET /api/bookings/getallbookings
// @desc    Get all bookings (Admin)
router.get('/getallbookings', async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    return res.status(500).json({ msg: 'Failed to fetch all bookings', error: error.message });
  }
});

module.exports = router;

