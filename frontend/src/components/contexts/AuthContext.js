// src/contexts/AuthContext.js

import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password, token) => {
    try {
      
      const endpoint = "http://localhost:8080/api/accounts/login";
      const body = JSON.stringify({ username, password, token });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      if (response) {
        const data = await response.json();
        setUser(data); 
        return true;
      } else {
        setUser(null);
        console.error("Login error");
        return false;
      }
    } catch (error) {
      console.error("Login error", error);
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
