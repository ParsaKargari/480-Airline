// src/contexts/AuthContext.js

import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Mock user accounts
  const mockUsers = [
    { username: "Admin", password: "Admin", role: "Admin" },
    { username: "User", password: "User", role: "User" },
    { username: "AirAgent", password: "AirAgent", role: "AirAgent" },
    { username: "TourAgent", password: "TourAgent", role: "TourAgent" },
  ];

  // Default User is User
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const matchedUser = mockUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      setUser({ username: matchedUser.username, role: matchedUser.role });
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
