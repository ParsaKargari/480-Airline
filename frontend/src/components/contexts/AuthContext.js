// src/contexts/AuthContext.js

import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Mock user accounts
  // Need to call API to confirm user credentials
  // We won't be using this mockUsers in the final project as we will be calling API to confirm user credentials
  // Send to backend: username, password
  // Receive from backend: user, role

  const mockUsers = [
    // Single user with each role
    { username: "Admin", password: "Admin", role: "Admin", registered: false },
    { username: "AirAgent", password: "AirAgent", role: "AirAgent", registered: false },
    { username: "TourAgent", password: "TourAgent", role: "TourAgent", registered: false },

    // Multiple users with the same role
    { username: "User", password: "User", role: "User", registered: true },
    { username: "User2", password: "User2", role: "User", registered: false },
    { username: "User3", password: "User3", role: "User", registered: false },
    { username: "User4", password: "User4", role: "User", registered: true },
  ];

  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const matchedUser = mockUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      setUser({ username: matchedUser.username, role: matchedUser.role });
      return true;
    } else {
      setUser(null);
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
