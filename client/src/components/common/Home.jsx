import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/api/rooms/getallrooms');
        setRooms(res.data || []);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      {/* Hero Carousel */}
      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="4000">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
              className="d-block w-100 hero-carousel-img"
              alt="Luxury Hotel"
            />
            <div className="carousel-caption hero-caption text-start px-md-5">
              <span className="badge bg-warning text-dark px-3 py-2 rounded-pill text-uppercase fw-bold mb-3">
                Welcome to HotelPro
              </span>
              <h1 className="display-4 fw-bold text-white mb-3">
                Experience Comfort, Elegance & Modern Hospitality
              </h1>
              <p className="lead text-light mb-4">
                Your ultimate hotel management and booking solution with instant confirmation and seamless room allocation.
              </p>
              <div className="d-flex gap-3">
                <Link to="/signup" className="btn btn-primary-gradient px-4 py-2 fs-5">
                  Book Your Stay Now
                </Link>
                <a href="#featured-rooms" className="btn btn-outline-light px-4 py-2 fs-5">
                  Explore Rooms
                </a>
              </div>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="4000">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80"
              className="d-block w-100 hero-carousel-img"
              alt="Deluxe Suite"
            />
            <div className="carousel-caption hero-caption text-start px-md-5">
              <span className="badge bg-info text-dark px-3 py-2 rounded-pill text-uppercase fw-bold mb-3">
                Deluxe Accommodations
              </span>
              <h1 className="display-4 fw-bold text-white mb-3">
                Unmatched Luxury Suites with Panoramic Views
              </h1>
              <p className="lead text-light mb-4">
                Designed for discerning guests with premium amenities, fast check-in, and flexible cancelations.
              </p>
              <Link to="/user" className="btn btn-primary-gradient px-4 py-2 fs-5">
                View Availability
              </Link>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="4000">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
              className="d-block w-100 hero-carousel-img"
              alt="Relaxing Lounge"
            />
            <div className="carousel-caption hero-caption text-start px-md-5">
              <span className="badge bg-success px-3 py-2 rounded-pill text-uppercase fw-bold mb-3">
                Best Price Guarantee
              </span>
              <h1 className="display-4 fw-bold text-white mb-3">
                Transparent Rates, Zero Hidden Booking Fees
              </h1>
              <p className="lead text-light mb-4">
                Streamlining guest bookings and hotel management operations across independent and boutique hotels.
              </p>
              <Link to="/login" className="btn btn-light px-4 py-2 fs-5">
                Guest Login
              </Link>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* About Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-primary fw-bold text-uppercase letter-spacing-1">About HotelPro</span>
              <h2 className="display-6 fw-bold mt-2 mb-4">
                Streamlined Hotel Operations & Seamless Guest Reservations
              </h2>
              <p className="text-secondary leading-relaxed">
                HotelPro provides a robust backend infrastructure that powers efficient booking management,
                real-time room availability tracking, and secure user authentication. We prioritize data privacy,
                encryption, and compliance, ensuring that every guest interaction is protected from unauthorized access.
              </p>
              <div className="row g-3 mt-2">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-3 bg-primary-subtle text-primary rounded-circle">
                      <i className="bi bi-shield-check fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">Secure Bookings</h6>
                      <small className="text-muted">Encrypted card handling</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-3 bg-success-subtle text-success rounded-circle">
                      <i className="bi bi-clock-history fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">Real-Time Sync</h6>
                      <small className="text-muted">Instant room availability</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80"
                  alt="Hotel lobby"
                  className="img-fluid rounded-4 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Preview Section */}
      <section id="featured-rooms" className="py-5 bg-light">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-bold">
              Accommodations
            </span>
            <h2 className="fw-bold display-6 mt-2">Featured Rooms & Suites</h2>
            <p className="text-secondary">Choose the perfect setting for your upcoming trip or vacation.</p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading rooms...</span>
              </div>
            </div>
          ) : rooms.length === 0 ? (
            <div className="alert alert-info text-center py-4">
              <i className="bi bi-info-circle me-2"></i> No rooms found. Admin can add rooms in the dashboard.
            </div>
          ) : (
            <div className="row g-4">
              {rooms.slice(0, 4).map((room) => (
                <div key={room._id} className="col-md-6 col-lg-3">
                  <div className="card h-100 room-card">
                    <img
                      src={
                        (room.photos && room.photos[0]) ||
                        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'
                      }
                      className="card-img-top"
                      alt={`Room ${room.roomNumber}`}
                    />
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span
                          className={
                            room.type?.toLowerCase().includes('delux')
                              ? 'badge-delux'
                              : 'badge-nondelux'
                          }
                        >
                          {room.type}
                        </span>
                        <span className="text-muted small">
                          <i className="bi bi-people me-1"></i> {room.count} Guests
                        </span>
                      </div>
                      <h5 className="card-title fw-bold">Room #{room.roomNumber}</h5>
                      <p className="card-text text-muted small flex-grow-1 line-clamp-2">
                        {room.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-2">
                        <div>
                          <span className="fs-5 fw-bold text-primary">₹{room.rent}</span>
                          <span className="text-muted small"> / day</span>
                        </div>
                        <Link to="/user" className="btn btn-outline-primary btn-sm rounded-pill px-3">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

