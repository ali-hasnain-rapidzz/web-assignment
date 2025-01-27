import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoutes'; // Import PrivateRoute
import Header from '../components/Templates/Header/Header';
import { protectedRoutes, publicRoutes } from './allRoutes';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Header />}>
            {protectedRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
