import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HianyzoErtekelesek from './pages/HianyzoErtekelesekPage';
import ErtekelesPage from './pages/ErtekelesPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashBoard';

// jogosultság ellenőrzése
const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate replace to={roleRequired === 'admin' ? "/admin/login" : "/login"} />;
  }

  if (roleRequired && userRole !== roleRequired) {
    return <Navigate replace to={userRole === 'admin' ? "/admin/dashboard" : "/hianyzo-ertekelesek"} />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* --- DIÁK ÚTVONALAK --- */}
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/hianyzo-ertekelesek"
          element={
            <PrivateRoute roleRequired="diak">
              <HianyzoErtekelesek />
            </PrivateRoute>
          }
        />
        <Route
          path="/tanar/:tanarId/ertekeles"
          element={
            <PrivateRoute roleRequired="diak">
              <ErtekelesPage />
            </PrivateRoute>
          }
        />

        {/* --- ADMIN ÚTVONALAK (ÚJ) --- */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* --- ÁLTALÁNOS ÁTIRÁNYÍTÁSOK --- */}
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;