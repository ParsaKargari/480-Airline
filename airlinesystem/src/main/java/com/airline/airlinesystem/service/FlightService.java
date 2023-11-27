package com.airline.airlinesystem.service;

import com.airline.airlinesystem.model.Flight;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class FlightService {
    public List<Flight> getFlights() {

        // Hardcoded flights for now
        // TODO: Fetch flights from database

        List<Flight> flights = new ArrayList<>();
        flights.add(new Flight(1, "Flight 1", "Destination 1", "Origin 1", "Flight Number 1", "Duration 1"));
        flights.add(new Flight(2, "Flight 2", "Destination 2", "Origin 2", "Flight Number 2", "Duration 2"));
        flights.add(new Flight(3, "Flight 3", "Destination 3", "Origin 3", "Flight Number 3", "Duration 3"));
        flights.add(new Flight(4, "Flight 4", "Destination 4", "Origin 4", "Flight Number 4", "Duration 4"));
        flights.add(new Flight(5, "Flight 5", "Destination 5", "Origin 5", "Flight Number 5", "Duration 5"));

        return flights;

    }
}
