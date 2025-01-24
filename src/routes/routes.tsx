import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Article from '../pages/article';
import ArticleDetail from '../pages/articleDetail';
import PrivateRoute from './privateRoutes'; // Import PrivateRoute
import Header from '../components/Layout/Header';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Require Authentication) */}
        <Route element={<PrivateRoute />}>
          {/* Header component is used as a wrapper layout for protected routes */}
          <Route element={<Header />}>
            <Route path="/article" element={<Article />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;