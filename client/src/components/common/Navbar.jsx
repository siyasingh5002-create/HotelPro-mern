import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  let user = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {}
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const isAdmin = user && (user.user?.userType === 'Admin' || user.userType === 'Admin');
  const displayName = user ? (user.user?.name || user.name || 'User') : '';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fs-4" to="/">
          <i className="bi bi-buildings"></i>
          <span>RoomsForUse</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-outline-light btn-sm px-3 rounded-pill" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                {isAdmin ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      <i className="bi bi-speedometer2 me-1"></i> Admin Dashboard
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/user">
                        <i className="bi bi-door-open me-1"></i> Browse Rooms
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/mybookings">
                        <i className="bi bi-calendar-check me-1"></i> My Bookings
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item ms-lg-3 d-flex align-items-center">
                  <span className="badge bg-light text-dark me-3 py-2 px-3 rounded-pill">
                    <i className="bi bi-person-circle me-1"></i> Hi, {displayName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger btn-sm px-3 rounded-pill"
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

