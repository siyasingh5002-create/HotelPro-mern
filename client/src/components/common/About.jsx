import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container py-5 my-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white">
            <span className="badge bg-primary-subtle text-primary fw-bold text-uppercase px-3 py-2 rounded-pill align-self-start mb-3">
              About HotelPro
            </span>
            <h1 className="fw-bold display-5 mb-4 text-dark">
              Enterprise Hotel Booking & Room Management Platform
            </h1>
            <p className="lead text-secondary mb-4">
              HotelPro is designed to meet the evolving operational and reservation needs of modern hospitality businesses.
              From managing room inventory to handling seamless check-ins and check-outs, our system ensures transparency,
              accuracy, and ease of use at every step.
            </p>

            <div className="row g-4 my-4">
              <div className="col-md-4">
                <div className="p-4 rounded-3 border bg-light h-100">
                  <i className="bi bi-person-badge text-primary fs-2 mb-2"></i>
                  <h5 className="fw-bold">Role-Based Access</h5>
                  <p className="text-muted small">
                    Distinct dashboards for ordinary customers and administrators with secure JWT session handling.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 rounded-3 border bg-light h-100">
                  <i className="bi bi-calendar2-range text-success fs-2 mb-2"></i>
                  <h5 className="fw-bold">Real-Time Bookings</h5>
                  <p className="text-muted small">
                    Smart date range selection, auto-calculated night stays, and live reservation status updates.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 rounded-3 border bg-light h-100">
                  <i className="bi bi-credit-card text-warning fs-2 mb-2"></i>
                  <h5 className="fw-bold">Safe Payments</h5>
                  <p className="text-muted small">
                    Integrated simulated card processing with masked storage to protect customer privacy.
                  </p>
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 mt-4">
              <Link to="/signup" className="btn btn-primary-gradient px-4 py-2">
                Join HotelPro
              </Link>
              <Link to="/" className="btn btn-outline-secondary px-4 py-2">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

