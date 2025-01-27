import React from 'react';
import Article from '@/pages/article';
import ArticleDetail from '@/pages/articleDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

export const publicRoutes = [
  { path: '/', element: <Register /> },
  { path: '/login', element: <Login /> },
];

export const protectedRoutes = [
  {
    path: '/article',
    element: <Article />,
  },
  {
    path: '/article/:id',
    element: <ArticleDetail />,
  },
];
