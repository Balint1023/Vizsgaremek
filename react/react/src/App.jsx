import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HianyzoErtekelesek from './pages/HianyzoErtekelesekPage';
import ErtekelesPage from './pages/ErtekelesPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminStats from './pages/Admin/AdminStats';
import AdminQuestions from './pages/Admin/AdminQuestions';

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
        <Route path="/hianyzo-ertekelesek" element={<PrivateRoute roleRequired="diak"><HianyzoErtekelesek /></PrivateRoute>} />
        <Route path="/tanar/:tanarId/ertekeles" element={<PrivateRoute roleRequired="diak"><ErtekelesPage /></PrivateRoute>} />

        {/* --- ADMIN ÚTVONALAK --- */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin/dashboard"
          element={<PrivateRoute roleRequired="admin"><AdminDashboard /></PrivateRoute>}
        >
          {/* Ez az "index" route töltődik be alapból az /admin/dashboard címen */}
          <Route index element={<Navigate replace to="eredmenyek" />} />
          <Route path="eredmenyek" element={<AdminStats />} />
          <Route path="kerdesek" element={<AdminQuestions />} />
          <Route path="kerdoivek" element={<div>Kérdőívek indítása/leállítása funkció</div>} />
        </Route>

        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;