import React, { useState } from 'react';
import api from '../../utils/api';

const AddRoom = ({ onRoomAdded }) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    count: '2',
    rent: '',
    type: 'Delux',
    image1: '',
    image2: '',
    image3: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.roomNumber || !formData.rent || !formData.description) {
      setError('Room Number, Rent, and Description are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const photos = [formData.image1, formData.image2, formData.image3]
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      const payload = {
        roomNumber: Number(formData.roomNumber),
        count: Number(formData.count) || 2,
        rent: Number(formData.rent),
        type: formData.type,
        photos:
          photos.length > 0
            ? photos
            : [
                'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'
              ],
        description: formData.description
      };

      const res = await api.post('/api/rooms/addroom', payload);
      setSuccess('Room added successfully!');
      alert(res.data.msg || 'Room added successfully!');

      setFormData({
        roomNumber: '',
        count: '2',
        rent: '',
        type: 'Delux',
        image1: '',
        image2: '',
        image3: '',
        description: ''
      });

      if (onRoomAdded) onRoomAdded();
    } catch (err) {
      console.error('Failed to add room:', err);
      setError(err.response?.data?.msg || 'Failed to add room. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <div className="bg-primary text-white p-3 rounded-3 mb-4 custom-navbar">
        <h5 className="fw-bold mb-0">
          <i className="bi bi-plus-circle me-2"></i> Add a New Room
        </h5>
      </div>

      {error && (
        <div className="alert alert-danger py-2 small mb-3">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success py-2 small mb-3">
          <i className="bi bi-check-circle-fill me-2"></i>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label small fw-bold">Room Number *</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 301"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-bold">Max Capacity (Guests)</label>
            <input
              type="number"
              className="form-control"
              placeholder="No. of people"
              name="count"
              value={formData.count}
              onChange={handleChange}
              min="1"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-bold">Room Rent (Per Day) *</label>
            <input
              type="number"
              className="form-control"
              placeholder="Rent in ₹"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small fw-bold">Room Photos (Image URLs)</label>
          <div className="row g-2">
            <div className="col-md-4">
              <input
                type="url"
                className="form-control"
                placeholder="Image 1 URL"
                name="image1"
                value={formData.image1}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="url"
                className="form-control"
                placeholder="Image 2 URL"
                name="image2"
                value={formData.image2}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="url"
                className="form-control"
                placeholder="Image 3 URL"
                name="image3"
                value={formData.image3}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small fw-bold d-block">Room Type *</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="type"
              id="deluxOption"
              value="Delux"
              checked={formData.type === 'Delux'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="deluxOption">
              Delux
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="type"
              id="nonDeluxOption"
              value="Non-Delux"
              checked={formData.type === 'Non-Delux'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="nonDeluxOption">
              Non-Delux
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label small fw-bold">Room Description *</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Detailed room features, bed configuration, amenities, view..."
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary-gradient px-4 py-2 fw-semibold"
        >
          {loading ? 'Adding Room...' : 'Add Room'}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;

