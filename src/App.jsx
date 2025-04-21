import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import LoginForm from './components/login/Login';
import Dashboard from './components/login/Proof';

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
