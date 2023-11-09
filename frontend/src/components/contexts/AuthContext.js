// src/contexts/AuthContext.js

import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Default User is User
  const [user, setUser] = useState({ username: "User", role: "User" });

  const login = (username, password) => {
    if (username === "Admin" && password === "Admin") {
      setUser({ username: "Admin", role: "Admin" });
      return true;
    } else if (username === "User" && password === "User") {
      setUser({ username: "User", role: "User" });
      return true;
    } else if (username === "AirAgent" && password === "AirAgent") {
      setUser({ username: "AirAgent", role: "AirAgent" });
      return true;
    } else if (username === "TourAgent" && password === "TourAgent") {
      setUser({ username: "TourAgent", role: "TourAgent" });
      return true;
    } else {
      setUser(null); // default to User role if credentials are not matching
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
