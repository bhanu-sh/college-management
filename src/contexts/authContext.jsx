"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  darkMode: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);  

  const getDarkMode = () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  };

  useEffect(() => {
    getDarkMode();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
