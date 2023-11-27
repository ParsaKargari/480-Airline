package com.airline.airlinesystem.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.airline.airlinesystem.model.Flight;
import com.airline.airlinesystem.repository.FlightRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    public List<Flight> getAllFlights() {
        // Get flights from database
        return flightRepository.findAll();
    }
}
