import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { useContext } from "react";
import { Provider } from "react-redux";

import LoginForm from "./pages/login/Login";
import Dashboard from "./pages/Dashboard.tsx";
import Rooms from "./pages/Rooms/Rooms";
import RoomDetail from "./pages/rooms/RoomDetail";
import Bookings from "./pages/Bookings/Bookings";
import Users from "./pages/users/Users";
import UserDetail from "./pages/users/UserDetail";
import Concierge from "./pages/concierge/Concierge";

import i18n from "./locales/translation/i18n";
import { I18nextProvider } from "react-i18next";

import { AuthProvider } from "./context/AuthContext";

import { AuthContext } from "./context/AuthContext.tsx";
import store from "./redux/store/store.js";
import AddUser from "./pages/users/AddUser.jsx";
import RoomForm from "./pages/rooms/RoomForm.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import Contact from "./pages/contact/Contact.jsx";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <Router>
            <Routes>
              <Route path="/" element={<LoginForm />} />

              {/* Ruta protegida principal que contiene las rutas anidadas */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                {/* Rutas anidadas - todas protegidas por el ProtectedRoute padre */}
                <Route index element={<DashboardPage />} />{" "}
                {/* Página por defecto al entrar a /dashboard */}
                <Route path="room" element={<Rooms />} />
                <Route path="room/:id" element={<RoomDetail />} />
                <Route path="room/edit/:id" element={<RoomForm />} />
                <Route path="booking" element={<Users />} />
                <Route path="booking/new" element={<AddUser />} />
                <Route path="booking/:id" element={<UserDetail />} />
                <Route path="contact" element={<Contact />} />
                <Route path="users" element={<Concierge />} />
              </Route>

              {/* Redirección para rutas no encontradas */}
              <Route path="*" element={<Navigate to="/sdfdsfdsf" replace />} />
            </Routes>
          </Router>
        </I18nextProvider>
      </AuthProvider>
    </Provider>
  );
}

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AuthContext);
  return state.isAuthenticated ? children : <Navigate to="/" replace />;
};

export default App;
