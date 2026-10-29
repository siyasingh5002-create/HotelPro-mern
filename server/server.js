const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Mount with both /api/ and direct prefixes for full compatibility
app.use('/api/users', userRoutes);
app.use('/users', userRoutes);

app.use('/api/rooms', roomRoutes);
app.use('/rooms', roomRoutes);

app.use('/api/bookings', bookingRoutes);
app.use('/bookings', bookingRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('HotelPro (RoomsForUse) API is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

