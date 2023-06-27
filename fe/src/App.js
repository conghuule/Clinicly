import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import config from './config';
import DefaultLayout from './layouts/DefaultLayout';
import { publicRoutes } from './routes';

function App() {
  const userId = sessionStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate(config.routes.login);
    }
  }, [userId, navigate]);

  return (
    <Routes>
      {publicRoutes.map((route) => {
        const Comp = route.element;
        let Layout = DefaultLayout;

        if (route.layout === null) {
          Layout = Fragment;
        } else if (route.layout) {
          Layout = route.layout;
        }
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Layout>
                <Comp />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
