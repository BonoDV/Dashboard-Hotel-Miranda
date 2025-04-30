import { createContext, useReducer, useEffect } from "react";
import { authReducer, initialState } from "../reducers/AuthReducer";
import UserList from "./../pages/login/users.json";
// Recuperar estado desde localStorage (si existe)
const getInitialState = () => {
  const userData = localStorage.getItem("logged");
  if (userData) {
    return JSON.parse(userData);
  }
  return initialState;
};

// Crear el contexto
export const AuthContext = createContext(null);

// Crear el proveedor
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState,
    getInitialState
  );

  // Guardar en localStorage cuando el estado cambie
  useEffect(() => {
    localStorage.setItem("logged", JSON.stringify(state));
  }, [state]);

  const loginUser = (user, password) => {
    const validUser = UserList.find(
      (u) => u.user === user && u.password === password
    );
  
    if (validUser) {
      dispatch({ type: "LOGIN", payload: { user, password } });
      return true; // éxito
    } else {
      return false; // credenciales incorrectas
    }
  };

  const logoutUser = () => {
    dispatch({ type: "LOGOUT" });
  };

  const updateUserInfo = (user, password) => {
    dispatch({ type: "UPDATE_USER", payload: { user, password } });
  };

  return (
    <AuthContext.Provider
      value={{ state, loginUser, logoutUser, updateUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
