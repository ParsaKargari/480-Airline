// src/components/TourAgentDashboard.js

import React from "react";
import { useLocation } from 'react-router-dom';

const TourAgentDashboard = () => {
  const location = useLocation();
  const selectedFlight = location.state && location.state.selectedFlight;


  return (
    <div>
      <h1>TourAgent Dashboard</h1>
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

export default TourAgentDashboard;
