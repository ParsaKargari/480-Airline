// src/contexts/AuthContext.js

import React, { createContext, useState } from "react";
import axios from "axios";
// import axios from 'axios'; // Uncomment if using axios

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password, token) => {
    try {
      // Define the API endpoint
      const endpoint = "http://localhost:8080/api/accounts/login"; // Adjust the URL as per your API

      // Prepare the request body
      const body = JSON.stringify({ username, password, token });

      // For fetch
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      // For axios (uncomment if using axios)
      // const response = await axios.post(endpoint, { username, password });

      if (response) {
        const data = await response.json();
        console.log(data);
        setUser(data); // Assuming the backend sends back the user's role
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
