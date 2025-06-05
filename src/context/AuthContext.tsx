import { createContext, useReducer, useEffect, ReactNode } from "react";
import { authReducer, initialState } from "../reducers/AuthReducer.ts";
import { loginConcierge } from "./../redux/features/concierge/conciergeSlice.ts";
import type { AppDispatch } from "./../redux/store/store.ts";
import { useDispatch } from "react-redux";
export type AuthContextType = {
  state: typeof initialState;
  loginUser: (email: string, password: string) => Promise<boolean>;
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

  const reduxDispatch = useDispatch<AppDispatch>();

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const resultAction = await reduxDispatch(
        loginConcierge({ email, password })
      );

      if (loginConcierge.fulfilled.match(resultAction)) {
        dispatch({ type: "LOGIN", payload: resultAction.payload }); // actualiza tu estado local
        // Guardar token de la api
        localStorage.setItem("token", resultAction.payload.token);

        return true;
      } else {
        return false;
      }
    } catch {
      return false;
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
