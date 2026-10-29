import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/api/users/login', {
        email: formData.email,
        password: formData.password
      });

      const { token, user } = res.data;

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify({ token, ...user }));

      // Redirect based on role
      const role = user.userType;
      if (role === 'Admin' || role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errMsg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        'Login failed. Please check your credentials.';
      setError(errMsg);
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 my-md-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="bg-primary text-white p-4 text-center custom-navbar">
              <h3 className="fw-bold mb-1">Welcome Back</h3>
              <p className="small mb-0 text-white-50">Sign in to your account</p>
            </div>
            <div className="card-body p-4 p-md-5">
              {error && (
                <div className="alert alert-danger py-2 small" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary-gradient w-100 py-2 fw-bold"
                >
                  {loading ? 'Authenticating...' : 'Login'}
                </button>
              </form>

              {/* Demo Credentials Helper Box */}
              <div className="mt-4 p-3 bg-light rounded-3 border small">
                <p className="fw-bold text-secondary mb-1">Demo Credentials:</p>
                <div className="d-flex justify-content-between mb-1">
                  <span>Ordinary User:</span>
                  <code>user@hotelpro.com / user123</code>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Admin User:</span>
                  <code>admin@hotelpro.com / admin123</code>
                </div>
              </div>

              <div className="text-center mt-4">
                <span className="text-muted small">Don't have an account? </span>
                <Link to="/signup" className="small fw-bold text-decoration-none text-primary">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

