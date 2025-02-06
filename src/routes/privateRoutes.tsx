import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '@Components/Templates/Header.template';

const isAuthenticated = () => {
  return localStorage.getItem('token');
};

const PrivateRoute: React.FC = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  ); 
};

export default PrivateRoute;
