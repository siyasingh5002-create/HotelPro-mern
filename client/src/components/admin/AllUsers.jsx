import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/users/allusers');
      setUsers(res.data || []);
    } catch (err) {
      console.error('Failed to load registered users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-dark mb-0">Total Registered Users: {users.length}</h5>
        <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={fetchUsers}>
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-muted small mt-2">Loading user accounts...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="alert alert-info text-center py-4 rounded-3">
          No registered users found.
        </div>
      ) : (
        <div className="table-responsive bg-white rounded-3 shadow-sm border">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Account Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isAdmin = u.userType?.toLowerCase() === 'admin';
                return (
                  <tr key={u._id}>
                    <td>
                      <code className="text-muted small">{u._id}</code>
                    </td>
                    <td className="fw-semibold">
                      <i className="bi bi-person-circle me-2 text-secondary"></i>
                      {u.name}
                    </td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${
                          isAdmin ? 'bg-danger' : 'bg-primary'
                        }`}
                      >
                        {u.userType || 'Ordinary'}
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

export default AllUsers;

