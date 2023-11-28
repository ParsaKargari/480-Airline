package com.airline.airlinesystem.service;


import com.airline.airlinesystem.core.Flight;
import com.airline.airlinesystem.repository.FlightRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    @Autowired
    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    // Save flight to database
    public Flight saveFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    // Return all flights
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    // Return flight by id
    public Flight getFlightById(Long id) {
        return flightRepository.findById(id).orElseThrow();
    }
}
