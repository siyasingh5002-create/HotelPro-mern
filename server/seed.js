const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const Room = require('./models/roomModel');

dotenv.config();

const sampleRooms = [
  {
    roomNumber: 101,
    count: 2,
    rent: 1500,
    type: 'Delux',
    photos: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Spacious Deluxe Suite with king-size bed, private balcony, ambient lighting, high-speed WiFi, mini-bar, and panoramic city views.'
  },
  {
    roomNumber: 102,
    count: 3,
    rent: 2200,
    type: 'Delux',
    photos: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Executive Ocean View Room equipped with premium bedding, modern marble bathroom, jacuzzi, and complimentary 24/7 room service.'
  },
  {
    roomNumber: 201,
    count: 2,
    rent: 850,
    type: 'Non-Delux',
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Cozy and budget-friendly standard twin room featuring comfortable beds, work desk, air conditioning, and en-suite shower.'
  },
  {
    roomNumber: 202,
    count: 4,
    rent: 1200,
    type: 'Non-Delux',
    photos: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Family Standard Room ideal for small groups and families, with two double beds, smart TV, and complimentary morning breakfast.'
  }
];

const seedDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hotel';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing
    await Room.deleteMany({});
    console.log('Cleared existing rooms.');

    // Seed rooms
    await Room.insertMany(sampleRooms);
    console.log(`Seeded ${sampleRooms.length} rooms successfully!`);

    // Create Admin user if not exists
    const adminEmail = 'admin@hotelpro.com';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      admin = await User.create({
        name: 'Hotel Administrator',
        email: adminEmail,
        password: hashedPassword,
        phone: '9876543210',
        userType: 'Admin',
        gender: 'Other',
        age: 30
      });
      console.log('Admin account created: admin@hotelpro.com / admin123');
    }

    // Create Sample Customer user if not exists
    const userEmail = 'user@hotelpro.com';
    let user = await User.findOne({ email: userEmail });
    if (!user) {
      const hashedPassword = await bcrypt.hash('user123', 10);
      user = await User.create({
        name: 'John Doe',
        email: userEmail,
        password: hashedPassword,
        phone: '9123456789',
        userType: 'Ordinary',
        gender: 'Male',
        age: 26
      });
      console.log('User account created: user@hotelpro.com / user123');
    }

    console.log('Database seeding finished successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();

