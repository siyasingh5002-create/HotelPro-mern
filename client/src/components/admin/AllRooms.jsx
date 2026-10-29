import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (roomId, roomNumber) => {
    if (!window.confirm(`Delete Room #${roomNumber}?`)) return;

    try {
      await api.delete(`/api/rooms/deleteroom/${roomId}`);
      alert('Room deleted successfully');
      fetchRooms();
    } catch (err) {
      console.error('Failed to delete room:', err);
      alert('Failed to delete room');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-dark mb-0">Existing Rooms: {rooms.length}</h5>
        <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={fetchRooms}>
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-muted small mt-2">Loading rooms...</p>
        </div>
      ) : rooms.length === 0 ? (
        <div className="alert alert-info text-center py-4 rounded-3">
          No rooms found. Switch to the "Add Room" tab to create one.
        </div>
      ) : (
        <div className="row g-4">
          {rooms.map((room) => (
            <div key={room._id} className="col-md-6 col-lg-4">
              <div className="card h-100 room-card">
                <img
                  src={
                    (room.photos && room.photos[0]) ||
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'
                  }
                  className="card-img-top"
                  alt={`Room ${room.roomNumber}`}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold text-dark mb-0">Room #{room.roomNumber}</h5>
                    <span
                      className={`badge ${
                        room.type?.toLowerCase().includes('delux')
                          ? 'bg-warning text-dark'
                          : 'bg-secondary'
                      }`}
                    >
                      {room.type}
                    </span>
                  </div>
                  <p className="text-muted small flex-grow-1 line-clamp-2">
                    {room.description}
                  </p>
                  <div className="small mb-3">
                    <span className="text-muted">Capacity: </span>
                    <strong>{room.count} Guests</strong> &nbsp;|&nbsp;
                    <span className="text-muted"> Rent: </span>
                    <strong className="text-primary">₹{room.rent}/day</strong>
                  </div>
                  <div className="d-flex justify-content-between align-items-center border-top pt-2">
                    <span className="badge bg-light text-secondary border">
                      Bookings: {room.currentbooking?.length || 0}
                    </span>
                    <button
                      className="btn btn-outline-danger btn-sm rounded-pill px-3"
                      onClick={() => handleDelete(room._id, room.roomNumber)}
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRooms;

