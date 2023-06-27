import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import config from './config';
import { AuthContext } from './context/authContext';
import DefaultLayout from './layouts/DefaultLayout';
import { privateRoutes, publicRoutes } from './routes';

function App() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth_data') || 'null') || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate(config.routes.login);
    }
  }, [auth, navigate]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
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
        {auth &&
          privateRoutes.map((route) => {
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
    </AuthContext.Provider>
  );
}

export default App;
