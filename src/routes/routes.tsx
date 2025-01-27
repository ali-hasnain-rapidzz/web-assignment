import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '@Routes/privateRoutes'; // Import PrivateRoute
import { protectedRoutes, publicRoutes } from '@/routes/allRoutes';

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
          {protectedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
