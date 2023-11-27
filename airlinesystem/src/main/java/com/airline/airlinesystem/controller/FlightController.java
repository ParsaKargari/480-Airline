package com.airline.airlinesystem.controller;

import com.airline.airlinesystem.model.Flight;
import com.airline.airlinesystem.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {
    @Autowired
    private FlightService flightService;

    // Returns list of flights
    @GetMapping // GET /api/flights
    public ResponseEntity<List<Flight>> getAllFlights() {
        System.out.println("GET /api/flights");
        return ResponseEntity.ok(flightService.getFlights());
    }
}
