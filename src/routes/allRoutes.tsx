import Article from '@Pages/article.page';
import ArticleDetail from '@Pages/articleDetail.page';
import Login from '@Pages/Login.page';
import Register from '@Pages/Register.page';

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
