import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations.js';
import { selectIsRefreshing } from './redux/auth/selectors.js';

function App() {
  const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
  const Favorites = lazy(() => import('./pages/Favorites/Favorites.jsx'));
  const Psychologists = lazy(() =>
    import('./pages/Psychologists/Psychologists.jsx')
  );
  const NotFoundPage = lazy(() =>
    import('./pages//NotFoundPage/NotFoundPage.jsx')
  );
  const Layout = lazy(() => import('./components/Layout/Layout.jsx'));
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) return <Loader />;

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="psychologists" element={<Psychologists />} />
            <Route
              path="favorites"
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
