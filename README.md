# HotelPro - Complete Hotel Booking & Management Solution (RoomsForUse)

HotelPro is a full-stack MERN (MongoDB, Express, React, Node.js) enterprise web application designed to streamline hotel operations, room reservations, inventory management, and guest handling with role-based access control.

---

## 🌟 Key Features

### 👤 Customer / Ordinary User Flow
- **User Authentication:** Registration with validation, login with JWT token persistence in `localStorage`.
- **Interactive Landing Page:** Hero showcase carousel, about section, and real-time room previews.
- **Room Browsing & Filters:** Filter rooms by categories (*Delux*, *Non-Delux*, *All*) or search by room number and features.
- **Dynamic Booking & Mock Payment:**
  - Select check-in and check-out dates with automatic night count and price computation.
  - Simulated encrypted card payment (`cardholdername`, `cardnumber`, `cvvcode`, `expmonthyear`).
- **My Bookings Dashboard:** Review past and upcoming bookings, active/cancelled statuses, and cancel active bookings on demand.

### 🛡️ Administrator Flow
- **Tab-Based Admin Dashboard:**
  1. **All Bookings:** Inspect all reservations made across the platform with guest and room info.
  2. **All Rooms:** View active rooms, availability counts, rates, and remove rooms.
  3. **Add Room:** Scaffolding to publish new rooms with images, pricing, occupancy, and room type.
  4. **All Users:** Full roster of registered users with role badges (Ordinary vs Admin).

---

## 🏗️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Bootstrap 5, Bootstrap Icons, Axios |
| **Backend** | Node.js, Express.js (MVC Pattern), CORS, Dotenv |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js password hashing |

---

## 📁 Project Architecture

```
HotelPro/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── userModel.js          # User schema (Ordinary & Admin)
│   │   ├── roomModel.js          # Room inventory schema
│   │   └── bookingModel.js       # Reservation & payment schema
│   ├── routes/
│   │   ├── userRoutes.js         # /api/users (signup, login, allusers)
│   │   ├── roomRoutes.js         # /api/rooms (getallrooms, addroom, deleteroom)
│   │   └── bookingRoutes.js      # /api/bookings (bookroom, cancelbooking, etc.)
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT verification middleware
│   ├── seed.js                   # Pre-populates default rooms and accounts
│   ├── server.js                 # Main Express server entry point
│   ├── .env                      # Environment configuration
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Navbar, Footer, Home, About, Login, SignUp, ProtectedRoute
│   │   │   ├── user/             # UserHome, RoomCard, BookingModal, MyBookings
│   │   │   └── admin/            # AdminHome, AllBookings, AllRooms, AddRoom, AllUsers
│   │   ├── utils/
│   │   │   └── api.js            # Axios client with JWT interceptor
│   │   ├── App.jsx               # Application routes
│   │   ├── main.jsx              # Vite React entry point
│   │   └── index.css             # Gradient themes and custom styles
│   ├── index.html
│   ├── vite.config.js
│   ├── .env
│   └── package.json
└── README.md
```

---

## 🚀 Quickstart Guide

### 1. Backend Setup
```bash
cd server
npm install
node seed.js    # Pre-fills sample Deluxe/Standard rooms & accounts
npm start       # Runs backend server at http://localhost:8000
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev     # Runs React Vite app at http://localhost:5173
```

---

## 🔑 Default Credentials (Seed Data)

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@hotelpro.com` | `admin123` |
| **Customer** | `user@hotelpro.com` | `user123` |

---

