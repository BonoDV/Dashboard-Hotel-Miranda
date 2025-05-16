export const initialState: AuthState = {
  isAuthenticated: false,
  user: "",
  password: "",
};

export type AuthState = {
  isAuthenticated: boolean;
  user?: string;
  password?: string;
};

export type AuthAction =
  | { type: "LOGIN"; payload: { user: string; password: string } }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: { user: string; password: string } };

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        password: action.payload.password,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: "",
        password: "",
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload.user,
        password: action.payload.password,
      };

    default:
      return state;
  }
}
