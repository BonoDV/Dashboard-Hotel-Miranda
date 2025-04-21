import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import LoginForm from './pages/login/Login';
import Dashboard from './pages/Dashboard';

import Rooms from './pages/Rooms/Rooms';
import Bookings from './pages/Bookings/Bookings';
import Users from './pages/users/Users';
import Reviews from './pages/contact/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/fdgd" />} />
      </Routes>
    </Router>
  );
}

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('logged') === 'true';
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default App;
