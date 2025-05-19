import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { useContext, ReactNode } from "react";
import { Provider } from "react-redux";

import LoginForm from "./pages/login/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Rooms from "./pages/rooms/Rooms.tsx";
import RoomDetail from "./pages/rooms/RoomDetail.jsx";
import Bookings from "./pages/bookings/Bookings.jsx";
import Users from "./pages/users/Users.tsx";
import UserDetail from "./pages/users/UserDetail.tsx";
import Concierge from "./pages/concierge/Concierge.tsx";

import i18n from "./locales/translation/i18n.ts";
import { I18nextProvider } from "react-i18next";

import { AuthProvider } from "./context/AuthContext.tsx";

import { AuthContext } from "./context/AuthContext.tsx";
import store from "./redux/store/store.js";
import AddUser from "./pages/users/AddUser.tsx";
import RoomForm from "./pages/rooms/RoomForm.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import Contact from "./pages/contact/Contact.tsx";

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
                <Route
                  path="booking/new"
                  element={<AddUser onSubmit={() => {}} />}
                />
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
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { state } = useContext(AuthContext)!;
  return state.isAuthenticated ? children : <Navigate to="/" replace />;
};

export default App;
