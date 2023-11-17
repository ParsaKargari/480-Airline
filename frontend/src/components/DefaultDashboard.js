// src/components/DefaultDashboard.js

import React from "react";
import { useLocation } from 'react-router-dom';

const DefaultDashboard = () => {
  const location = useLocation();
  const selectedFlight = location.state && location.state.selectedFlight;

  console.log("Default dashboard: " + selectedFlight);

  return (
    <div>
      <h1>Default Dashboard</h1>
      {selectedFlight && (
        <div>
          <h2>Selected Flight Information</h2>
          <p>ID: {selectedFlight.id}</p>
          <p>Label: {selectedFlight.label}</p>
        </div>
      )}
    </div>
  );
};

export default DefaultDashboard;
