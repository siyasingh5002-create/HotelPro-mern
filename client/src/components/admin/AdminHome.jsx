import React, { useState } from 'react';
import AllBookings from './AllBookings';
import AllRooms from './AllRooms';
import AddRoom from './AddRoom';
import AllUsers from './AllUsers';

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  const userStr = localStorage.getItem('user');
  let adminName = 'Admin';
  if (userStr) {
    try {
      const userObj = JSON.parse(userStr);
      adminName = userObj.name || userObj.user?.name || 'Administrator';
    } catch (e) {}
  }

  return (
    <div className="container py-4">
      {/* Top Header Banner */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 text-white custom-navbar">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <span className="badge bg-danger px-3 py-2 rounded-pill text-uppercase fw-bold mb-2">
              <i className="bi bi-shield-lock me-1"></i> Admin Portal
            </span>
            <h2 className="fw-bold mb-1">Welcome back, {adminName}</h2>
            <p className="text-white-50 small mb-0">
              Manage hotel inventory, track customer reservations, and review registered users.
            </p>
          </div>
          <div className="text-end">
            <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
              <i className="bi bi-gear-fill me-1 text-primary"></i> System Status: Online
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation (matching pages 12, 23, 54) */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
        <div className="card-header bg-white border-bottom p-0">
          <ul className="nav nav-tabs admin-nav-tabs border-0">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <i className="bi bi-journal-bookmark-fill me-2"></i> All Bookings
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'rooms' ? 'active' : ''}`}
                onClick={() => setActiveTab('rooms')}
              >
                <i className="bi bi-door-open-fill me-2"></i> All Rooms
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'addroom' ? 'active' : ''}`}
                onClick={() => setActiveTab('addroom')}
              >
                <i className="bi bi-plus-circle-fill me-2"></i> Add Room
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                <i className="bi bi-people-fill me-2"></i> All Users
              </button>
            </li>
          </ul>
        </div>

        {/* Tab Contents */}
        <div className="card-body p-4">
          {activeTab === 'bookings' && <AllBookings />}
          {activeTab === 'rooms' && <AllRooms />}
          {activeTab === 'addroom' && (
            <AddRoom onRoomAdded={() => setActiveTab('rooms')} />
          )}
          {activeTab === 'users' && <AllUsers />}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

