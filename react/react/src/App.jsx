import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HianyzoErtekelesek from './pages/HianyzoErtekelesekPage';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate replace to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Védett útvonalak */}
        <Route
          path="/diak/:id/hianyzo-ertekelesek"
          element={
            <PrivateRoute>
              <HianyzoErtekelesek />
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;