const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');

// @route   GET /api/rooms/getallrooms
// @desc    Get all rooms
router.get('/getallrooms', async (req, res) => {
  try {
    const rooms = await Room.find({}).sort({ createdAt: -1 });
    return res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return res.status(500).json({ msg: 'Failed to fetch rooms', error: error.message });
  }
});

// @route   GET /api/rooms/getroombyid/:id
// @desc    Get room by ID
router.get('/getroombyid/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }
    return res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    return res.status(500).json({ msg: 'Failed to fetch room', error: error.message });
  }
});

// @route   POST /api/rooms/addroom
// @desc    Add a new room (Admin)
router.post('/addroom', async (req, res) => {
  try {
    const { roomNumber, count, rent, type, photos, description } = req.body;

    if (!roomNumber || !rent || !type || !description) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    const newRoom = new Room({
      roomNumber,
      count: count || 2,
      rent,
      type,
      photos: Array.isArray(photos) ? photos : [photos].filter(Boolean),
      description,
      currentbooking: []
    });

    const savedRoom = await newRoom.save();
    return res.status(201).json({ msg: 'Room added successfully', room: savedRoom });
  } catch (error) {
    console.error('Error adding room:', error);
    return res.status(500).json({ msg: 'Failed to add room', error: error.message });
  }
});

// @route   DELETE /api/rooms/deleteroom/:id
// @desc    Delete a room (Admin)
router.delete('/deleteroom/:id', async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Room not found' });
    }
    return res.status(200).json({ msg: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    return res.status(500).json({ msg: 'Failed to delete room', error: error.message });
  }
});

module.exports = router;

