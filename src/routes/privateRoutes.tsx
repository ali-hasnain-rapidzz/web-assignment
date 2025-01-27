import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '@/components/Templates/Header/Header';

// A simple check to determine if the user is authenticated
const isAuthenticated = () => {
  // Implement your authentication check logic, e.g., checking localStorage or session
  return localStorage.getItem('auth_token') !== null;
};

const PrivateRoute: React.FC = () => {
  if (isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  ); // Render child routes if authenticated
};

export default PrivateRoute;
