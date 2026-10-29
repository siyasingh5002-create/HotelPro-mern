import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <div className="container text-center py-4">
        <div className="row gy-3">
          <div className="col-md-6 text-md-start">
            <h5 className="text-white fw-bold mb-1">
              <i className="bi bi-buildings me-2 text-primary"></i>RoomsForUse (HotelPro)
            </h5>
            <p className="text-secondary small mb-0">
              Modern hotel management, seamless reservations, and real-time room tracking.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-secondary small mb-1">
              © {new Date().getFullYear()} HotelPro Solution. All Rights Reserved.
            </p>
            <span className="badge bg-secondary-subtle text-light small">
              MERN Stack Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

