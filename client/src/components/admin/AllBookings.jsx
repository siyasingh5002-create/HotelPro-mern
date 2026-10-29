import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/bookings/getallbookings');
      setBookings(res.data || []);
    } catch (err) {
      console.error('Failed to load all bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-dark mb-0">Total Bookings: {bookings.length}</h5>
        <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={fetchBookings}>
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-muted small mt-2">Loading system bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="alert alert-info text-center py-4 rounded-3">
          No user bookings currently recorded in the system.
        </div>
      ) : (
        <div className="table-responsive bg-white rounded-3 shadow-sm border">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Room Type</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Total Paid</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const isCancelled = b.status?.toLowerCase() === 'cancelled';
                return (
                  <tr key={b._id}>
                    <td>
                      <code className="text-muted small">{b._id.slice(-8)}</code>
                    </td>
                    <td className="fw-semibold">{b.username}</td>
                    <td>
                      <span
                        className={`badge ${
                          b.type?.toLowerCase().includes('delux')
                            ? 'bg-warning text-dark'
                            : 'bg-secondary'
                        }`}
                      >
                        {b.type}
                      </span>
                    </td>
                    <td>{b.fromdate}</td>
                    <td>{b.todate}</td>
                    <td className="fw-bold text-success">₹{b.totalAmount}</td>
                    <td>{b.phone}</td>
                    <td>
                      <span
                        className={`badge rounded-pill ${
                          isCancelled ? 'bg-danger' : 'bg-success'
                        }`}
                      >
                        {b.status?.toUpperCase() || 'BOOKED'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBookings;

