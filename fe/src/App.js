import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import { publicRoutes } from './routes';
import WaitingList from './pages/List/waitingList';

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route) => {
          const Comp = route.element;
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Comp />
                  <WaitingList />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
