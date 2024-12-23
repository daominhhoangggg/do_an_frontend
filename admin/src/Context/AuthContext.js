import React, { createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";

const INITIAL_STATE = {
  user: null,
  loading: true,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    // case "LOGIN_START":
    //   return {
    //     user: null,
    //     loading: true,
    //     error: null,
    //   };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return null;
      } else {
        return decoded;
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      return null;
    }
  } else {
    return null;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const fetchUserFromToken = async () => {
      const decoded = getUserFromToken();
      if (decoded) {
        dispatch({ type: "LOGIN_SUCCESS", payload: decoded });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    };
    fetchUserFromToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
