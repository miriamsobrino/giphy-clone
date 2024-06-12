import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import FavoritePage from './pages/FavoritePage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import GifPage from './pages/GifPage';
import GifProvider from './context/context';
import { Hash } from 'lucide-react';

const router = createHashRouter(
  [
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/:category',
          element: <CategoryPage />,
        },
        {
          path: '/favorites',
          element: <FavoritePage />,
        },
        {
          path: '/:type/:slug',
          element: <GifPage />,
        },
        {
          path: '/:category/:type/:slug',
          element: <GifPage />,
        },
        {
          path: '/search/:query',
          element: <SearchPage />,
        },
        {
          path: '/search/:query/:type/:slug',
          element: <GifPage />,
        },
      ],
    },
  ],
  { basename: '/giphy-clone' }
);
function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
