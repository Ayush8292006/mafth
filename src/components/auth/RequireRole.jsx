import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

/** Route guard: renders children only for the allowed roles, otherwise sends to /login */
export default function RequireRole({ roles, children }) {
  const { isAuthenticated, currentRole } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !roles.includes(currentRole)) {
    return <Navigate to="/login" replace state={{ from: location.pathname, denied: isAuthenticated }} />;
  }
  return children;
}
