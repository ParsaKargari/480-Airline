// src/components/AirAgentDashboard.js

import React from "react";
import { useLocation } from 'react-router-dom';

const AirAgentDashboard = () => {
  const location = useLocation();
  const selectedFlight = location.state && location.state.selectedFlight;

  console.log("AirAgent dashboard: " + selectedFlight);

  return (
    <div>
      <h1>Air Agent</h1>
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

export default AirAgentDashboard;
