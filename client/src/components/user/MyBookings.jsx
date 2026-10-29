import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const userStr = localStorage.getItem('user');
  let user = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {}
  }

  const fetchUserBookings = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const userId = user._id || user.id;
      const res = await api.post('/api/bookings/getbookingsbyuserid', { userid: userId });
      setBookings(res.data || []);
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const handleCancel = async (booking) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel booking #${booking._id}?`
    );
    if (!confirmCancel) return;

    try {
      setCancellingId(booking._id);
      const res = await api.post('/api/bookings/cancelbooking', {
        bookingid: booking._id,
        roomid: booking.roomid
      });
      alert(res.data.msg || 'Booking cancelled successfully.');
      fetchUserBookings();
    } catch (err) {
      console.error('Cancel booking error:', err);
      alert(err.response?.data?.msg || 'Could not cancel booking.');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1 text-dark">
            <i className="bi bi-calendar-check text-primary me-2"></i>My Bookings
          </h2>
          <p className="text-secondary small mb-0">
            View your reservation records and check-in schedules.
          </p>
        </div>
        <Link to="/user" className="btn btn-outline-primary btn-sm rounded-pill px-3">
          <i className="bi bi-plus-lg me-1"></i> Book Another Room
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading bookings...</span>
          </div>
          <p className="text-muted small mt-2">Retrieving your bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="card border-0 shadow-sm p-5 text-center bg-white rounded-4">
          <i className="bi bi-calendar-x text-muted" style={{ fontSize: '3rem' }}></i>
          <h4 className="fw-bold mt-3">No Reservations Found</h4>
          <p className="text-muted">You haven't made any hotel room reservations yet.</p>
          <Link to="/user" className="btn btn-primary-gradient align-self-center px-4 rounded-pill">
            Explore & Book Rooms
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => {
            const isCancelled = booking.status?.toLowerCase() === 'cancelled';
            return (
              <div key={booking._id} className="col-md-6 col-lg-6">
                <div
                  className={`card border-0 rounded-4 shadow-sm p-4 h-100 ${
                    isCancelled ? 'bg-light border-danger-subtle' : 'bg-white'
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <span className="badge bg-primary-subtle text-primary fw-bold text-uppercase px-2 py-1 mb-1">
                        {booking.type} Room
                      </span>
                      <h5 className="fw-bold text-dark mb-0">
                        Room #{booking.roomNumber || 'Delux'}
                      </h5>
                    </div>
                    <span
                      className={`badge rounded-pill px-3 py-2 fw-semibold ${
                        isCancelled ? 'bg-danger' : 'bg-success'
                      }`}
                    >
                      <i
                        className={`bi ${
                          isCancelled ? 'bi-x-circle' : 'bi-check-circle'
                        } me-1`}
                      ></i>
                      {booking.status?.toUpperCase() || 'BOOKED'}
                    </span>
                  </div>

                  <div className="bg-light p-3 rounded-3 mb-3 small">
                    <div className="row g-2">
                      <div className="col-sm-6">
                        <span className="text-muted d-block">Booking ID:</span>
                        <code className="text-dark fw-bold">{booking._id}</code>
                      </div>
                      <div className="col-sm-6">
                        <span className="text-muted d-block">Registered Phone:</span>
                        <strong className="text-dark">{booking.phone}</strong>
                      </div>
                      <div className="col-sm-6">
                        <span className="text-muted d-block">From Check-in:</span>
                        <strong className="text-primary">{booking.fromdate}</strong>
                      </div>
                      <div className="col-sm-6">
                        <span className="text-muted d-block">To Check-out:</span>
                        <strong className="text-primary">{booking.todate}</strong>
                      </div>
                      <div className="col-sm-6">
                        <span className="text-muted d-block">Duration:</span>
                        <strong>{booking.totaldays} Nights</strong>
                      </div>
                      <div className="col-sm-6">
                        <span className="text-muted d-block">Total Paid:</span>
                        <span className="fs-6 fw-bold text-success">
                          ₹{booking.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                    <span className="text-muted small">
                      <i className="bi bi-credit-card me-1"></i> Card Ending in{' '}
                      {booking.cardDetails?.cardnumber?.slice(-4) || '****'}
                    </span>
                    <button
                      className="btn btn-outline-danger btn-sm px-3 rounded-pill"
                      disabled={isCancelled || cancellingId === booking._id}
                      onClick={() => handleCancel(booking)}
                    >
                      {cancellingId === booking._id ? (
                        'Cancelling...'
                      ) : isCancelled ? (
                        'Cancelled'
                      ) : (
                        <>
                          <i className="bi bi-x-circle me-1"></i> Cancel Booking
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

