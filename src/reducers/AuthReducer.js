export const initialState = {
  isAuthenticated: false,
};

export function authReducer(state, action) {
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
