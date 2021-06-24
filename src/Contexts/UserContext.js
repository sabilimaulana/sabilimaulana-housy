import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  user: {
    id: null,
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    status: "",
  },
  isLogin: true,
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        ...payload,
        isLogin: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {
          id: null,
          name: "",
          username: "",
          password: "",
          email: "",
          phone: "",
          status: "",
        },
        isLogin: false,
      };
    default:
      throw new Error("case unknown");
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
