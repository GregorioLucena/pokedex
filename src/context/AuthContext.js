import React, { useState, createContext } from "react";
import { SearchBar } from "react-native-screens";

export const AuthContext = createContext({
  auth: undefined,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);

  const login = (userData) => {
    setAuth(userData);
  };

  const logout = () => {
    setAuth(undefined);
  };

  const valueContext = { auth, login, logout };
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};
