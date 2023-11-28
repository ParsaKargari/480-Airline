package com.airline.airlinesystem.controller;

import com.airline.airlinesystem.core.Flight;
import com.airline.airlinesystem.core.Seat;
import com.airline.airlinesystem.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin
public class FlightController {
    @Autowired
    private FlightService flightService;

    // Returns list of flights
    // Works
    @GetMapping // GET /api/flights
    public ResponseEntity<List<Flight>> getAllFlights() {
        System.out.println("GET /api/flights");
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    // Add a flight
    // Works
    @PostMapping // POST /api/flights
    public ResponseEntity<Flight> addFlight(@RequestBody Flight flight) {
        Flight savedFlight = flightService.saveFlight(flight);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFlight);
    }

    // Returns sold out seats for a flight
    // Works
    @GetMapping("/{id}/seats/sold-out") // GET /api/flights/{id}/seats/sold-out
    public ResponseEntity<List<Seat>> getSoldOutSeats(@PathVariable Long id) {
        Flight flight = flightService.getFlightById(id);
        List<Seat> soldOutSeats = flight.getSoldOutSeats();
        return ResponseEntity.ok(soldOutSeats);
    }

    // Book seats for a flight
    // Works
    @PostMapping("/{id}/seats/book") // POST /api/flights/{id}/seats/book
    public ResponseEntity<Flight> bookSeats(@PathVariable Long id, @RequestBody List<String> seatNumbers) {
        Flight flight = flightService.getFlightById(id);
        flight.selectSeats(seatNumbers);
        Flight updatedFlight = flightService.saveFlight(flight);
        return ResponseEntity.ok(updatedFlight);
    }

}
