package Main.java.com.example.airline.service;

import Main.java.com.example.airline.model.Flight;
import Main.java.com.example.airline.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {
    @Autowired
    private FlightRepository flightRepository;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    // Add other methods as needed
}
