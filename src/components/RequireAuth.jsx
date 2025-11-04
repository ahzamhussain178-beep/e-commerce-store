import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RequireAuth = ({ children, requireAdmin = false }) => {
  const { user, isAuthenticated } = useAuth() || {};
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    // if logged in but not admin, redirect to user dashboard
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

export default RequireAuth;
