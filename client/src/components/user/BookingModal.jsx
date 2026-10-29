import React, { useState } from 'react';
import api from '../../utils/api';

const BookingModal = ({ room, user, onClose, onBookingSuccess }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardholdername: user?.name || '',
    cardnumber: '',
    cvvcode: '',
    expmonthyear: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate days & total
  let totalDays = 0;
  let totalAmount = 0;

  if (fromDate && toDate) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      totalDays = diffDays;
      totalAmount = totalDays * room.rent;
    }
  }

  const handleCardChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleBook = async (e) => {
    e.preventDefault();

    if (!fromDate || !toDate) {
      setError('Please select valid check-in and check-out dates.');
      return;
    }

    if (totalDays <= 0) {
      setError('Check-out date must be after check-in date.');
      return;
    }

    if (!cardDetails.cardholdername || !cardDetails.cardnumber || !cardDetails.cvvcode || !cardDetails.expmonthyear) {
      setError('Please complete all card payment details.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        roomid: room._id,
        roomNumber: room.roomNumber,
        type: room.type,
        userid: user._id || user.id,
        username: user.name,
        fromdate: fromDate,
        todate: toDate,
        totalAmount,
        totaldays: totalDays,
        phone: user.phone || '9999999999',
        cardDetails
      };

      const res = await api.post('/api/bookings/bookroom', payload);
      alert(res.data.msg || 'Room booked successfully!');
      onBookingSuccess();
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.response?.data?.msg || 'Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          <div className="modal-header bg-primary text-white custom-navbar">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-calendar2-check me-2"></i> Book Room #{room.roomNumber} ({room.type})
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <form onSubmit={handleBook}>
            <div className="modal-body p-4">
              {error && (
                <div className="alert alert-danger py-2 small mb-3">
                  <i className="bi bi-exclamation-octagon me-1"></i> {error}
                </div>
              )}

              {/* Room Highlights */}
              <div className="row g-3 mb-4 align-items-center">
                <div className="col-md-5">
                  <img
                    src={
                      (room.photos && room.photos[0]) ||
                      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'
                    }
                    alt={`Room ${room.roomNumber}`}
                    className="img-fluid rounded-3 shadow-sm w-100"
                    style={{ height: '170px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-7">
                  <h5 className="fw-bold text-dark mb-1">Room #{room.roomNumber}</h5>
                  <p className="text-muted small mb-2">{room.description}</p>
                  <div className="d-flex gap-2">
                    <span className="badge bg-secondary">
                      <i className="bi bi-people me-1"></i> Up to {room.count} Guests
                    </span>
                    <span className="badge bg-primary">₹{room.rent} / night</span>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="card p-3 mb-4 bg-light border-0">
                <h6 className="fw-bold text-dark mb-3">1. Select Reservation Dates</h6>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold">Check-in Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={fromDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFromDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold">Check-out Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={toDate}
                      min={fromDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setToDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {totalDays > 0 && (
                  <div className="mt-3 p-2 bg-white rounded border d-flex justify-content-between align-items-center">
                    <span className="small text-muted">
                      Total Stay: <strong>{totalDays} {totalDays === 1 ? 'night' : 'nights'}</strong> (₹{room.rent} × {totalDays})
                    </span>
                    <span className="fs-5 fw-bold text-success">Total: ₹{totalAmount}</span>
                  </div>
                )}
              </div>

              {/* Payment Info / Card Details */}
              <div className="card p-3 bg-light border-0">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold text-dark mb-0">2. Payment Information (Card Details)</h6>
                  <span className="badge bg-info-subtle text-info small">Mock Gateway</span>
                </div>
                <p className="text-muted small mb-3">
                  Your payment details are protected with simulated end-to-end encryption.
                </p>

                <div className="row g-2">
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold">Cardholder Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name on card"
                      name="cardholdername"
                      value={cardDetails.cardholdername}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold">Card Number *</label>
                    <input
                      type="text"
                      maxLength="19"
                      className="form-control"
                      placeholder="1234 5678 9012 3456"
                      name="cardnumber"
                      value={cardDetails.cardnumber}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold">Expiry (MM/YY) *</label>
                    <input
                      type="text"
                      maxLength="5"
                      className="form-control"
                      placeholder="12/28"
                      name="expmonthyear"
                      value={cardDetails.expmonthyear}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold">CVV Code *</label>
                    <input
                      type="password"
                      maxLength="4"
                      className="form-control"
                      placeholder="123"
                      name="cvvcode"
                      value={cardDetails.cvvcode}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-secondary px-3"
                onClick={onClose}
                disabled={loading}
              >
                Close
              </button>
              <button
                type="submit"
                disabled={loading || totalDays <= 0}
                className="btn btn-primary-gradient px-4"
              >
                {loading ? 'Processing Payment...' : `Confirm & Pay ₹${totalAmount || room.rent}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

