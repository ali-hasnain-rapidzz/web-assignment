import Article from '@Pages/article';
import ArticleDetail from '@Pages/articleDetail';
import Login from '@Pages/Login';
import Register from '@Pages/Register';

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
