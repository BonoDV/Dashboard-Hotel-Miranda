import { createContext, useReducer, useEffect, ReactNode } from "react";
import { authReducer, initialState } from "../reducers/AuthReducer.ts";
import UserList from "../pages/login/users.json";

export type AuthContextType = {
  state: typeof initialState;
  loginUser: (username: string, password: string) => boolean;
  logoutUser: () => void;
  updateUserInfo: (user: string, password: string) => void;
};

// Recuperar estado desde localStorage (si existe)
const getInitialState = () => {
  const userData = localStorage.getItem("logged");
  if (userData) {
    return JSON.parse(userData);
  }
  return initialState;
};

// Crear el contexto
export const AuthContext = createContext<AuthContextType | null>(null);

// Crear el proveedor
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState,
    getInitialState
  );

  // Guardar en localStorage cuando el estado cambie
  useEffect(() => {
    localStorage.setItem("logged", JSON.stringify(state));
  }, [state]);

  const loginUser = (user: string, password: string) => {
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

  const updateUserInfo = (user: string, password: string) => {
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
