import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const login = async () => {
    try {
      const response = await fetch("http://localhost:5000/authenticate", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setIsAuth(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
