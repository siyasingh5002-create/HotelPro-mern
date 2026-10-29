import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import BookingModal from './BookingModal';

const UserHome = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const userStr = localStorage.getItem('user');
  let user = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {}
  }

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/rooms/getallrooms');
      setRooms(res.data || []);
    } catch (err) {
      console.error('Failed to load rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const matchesType =
      filterType === 'All'
        ? true
        : room.type?.toLowerCase() === filterType.toLowerCase();

    const matchesSearch =
      room.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.roomNumber?.toString().includes(searchTerm);

    return matchesType && matchesSearch;
  });

  return (
    <div className="container py-4">
      {/* Welcome Hero Banner */}
      <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 mb-4 text-white custom-navbar">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span className="badge bg-light text-primary px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">
              Guest Portal
            </span>
            <h1 className="fw-bold display-6 mb-2">
              Welcome, {user?.name || 'Guest'}!
            </h1>
            <p className="lead text-white-50 mb-4">
              Browse available rooms, select your stay dates, and manage all your reservations with real-time updates.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Link to="/mybookings" className="btn btn-light px-4 py-2 fw-semibold text-primary">
                <i className="bi bi-calendar-check me-2"></i> View My Bookings
              </Link>
            </div>
          </div>
          <div className="col-lg-4 text-center d-none d-lg-block">
            <i className="bi bi-building-check" style={{ fontSize: '7rem', opacity: 0.85 }}></i>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border-0 shadow-sm p-3 rounded-4 mb-4 bg-white">
        <div className="row g-3 align-items-center justify-content-between">
          <div className="col-md-6 d-flex gap-2">
            <button
              className={`btn btn-sm rounded-pill px-3 ${
                filterType === 'All' ? 'btn-primary' : 'btn-outline-secondary'
              }`}
              onClick={() => setFilterType('All')}
            >
              All Rooms ({rooms.length})
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 ${
                filterType === 'Delux' ? 'btn-primary' : 'btn-outline-secondary'
              }`}
              onClick={() => setFilterType('Delux')}
            >
              Delux Suites
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 ${
                filterType === 'Non-Delux' ? 'btn-primary' : 'btn-outline-secondary'
              }`}
              onClick={() => setFilterType('Non-Delux')}
            >
              Standard / Non-Delux
            </button>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 bg-light"
                placeholder="Search by room # or feature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading rooms...</span>
          </div>
          <p className="mt-2 text-muted">Fetching latest room status...</p>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="card border-0 shadow-sm p-5 text-center bg-white rounded-4">
          <i className="bi bi-door-closed text-muted" style={{ fontSize: '3rem' }}></i>
          <h4 className="fw-bold mt-3">No Rooms Match Your Criteria</h4>
          <p className="text-muted">Try resetting your filters or searching for another term.</p>
          <button
            className="btn btn-outline-primary btn-sm align-self-center px-4 rounded-pill"
            onClick={() => {
              setFilterType('All');
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredRooms.map((room) => (
            <div key={room._id} className="col-md-6 col-lg-4">
              <div className="card h-100 room-card">
                <div className="position-relative">
                  <img
                    src={
                      (room.photos && room.photos[0]) ||
                      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'
                    }
                    className="card-img-top"
                    alt={`Room ${room.roomNumber}`}
                  />
                  <span
                    className={`position-absolute top-0 end-0 m-3 ${
                      room.type?.toLowerCase().includes('delux')
                        ? 'badge-delux'
                        : 'badge-nondelux'
                    }`}
                  >
                    {room.type}
                  </span>
                </div>

                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title fw-bold text-dark mb-0">
                      Room #{room.roomNumber}
                    </h5>
                    <span className="text-muted small">
                      <i className="bi bi-people me-1"></i> {room.count} Max Guests
                    </span>
                  </div>

                  <p className="card-text text-secondary small flex-grow-1 line-clamp-3 mb-3">
                    {room.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
                    <div>
                      <span className="fs-5 fw-bold text-primary">₹{room.rent}</span>
                      <span className="text-muted small"> / night</span>
                    </div>
                    <button
                      className="btn btn-primary-gradient px-3 btn-sm rounded-pill"
                      onClick={() => setSelectedRoom(room)}
                    >
                      <i className="bi bi-calendar-plus me-1"></i> Book Room
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          user={user}
          onClose={() => setSelectedRoom(null)}
          onBookingSuccess={() => {
            setSelectedRoom(null);
            navigate('/mybookings');
          }}
        />
      )}
    </div>
  );
};

export default UserHome;

