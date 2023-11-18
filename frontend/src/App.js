// src/App.js

import React from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import { AuthProvider } from "./components/contexts/AuthContext";
import AdminDashboard from "./components/AdminDashboard";
import AirAgentDashboard from "./components/AirAgentDashboard";
import TourAgentDashboard from "./components/TourAgentDashboard";
import DefaultDashboard from "./components/DefaultDashboard";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    
  },
  routes: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route
              path="/air-agent-dashboard"
              element={<AirAgentDashboard />}
            />
            <Route
              path="/tour-agent-dashboard"
              element={<TourAgentDashboard />}
            />
            <Route path="/default-dashboard" element={<DefaultDashboard />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
