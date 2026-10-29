import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const userObj = JSON.parse(userStr);
    const userType = userObj.user?.userType || userObj.userType;

    if (roleRequired && userType !== roleRequired) {
      // If role required is Admin but user is Ordinary, redirect to /user
      if (roleRequired === 'Admin') {
        return <Navigate to="/user" replace />;
      }
    }
  } catch (e) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

