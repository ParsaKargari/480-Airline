package com.airline.airlinesystem.controller;


import com.airline.airlinesystem.core.Flight;
import com.airline.airlinesystem.core.Seat;
import com.airline.airlinesystem.core.Passenger;
import com.airline.airlinesystem.service.FlightService;
import com.airline.airlinesystem.service.PassengerService;
import com.airline.airlinesystem.service.SeatService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;




@RestController
@RequestMapping("/api/flights")
@CrossOrigin
public class FlightController {
    @Autowired
    private FlightService flightService;
    @Autowired
    private PassengerService passengerService;
    @Autowired
    private SeatService seatService;

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


    // Book seats for a flight by id
    // Works
    @PostMapping("/{id}/seats/book") // POST /api/flights/{id}/seats/book
    public ResponseEntity<Flight> bookSeats(@PathVariable Long id, @RequestBody String name, @RequestBody String email, @RequestBody List<String> seatNumbers, @RequestBody String seatType) {
        Flight flight = flightService.getFlightById(id);
        flight.selectSeats(seatNumbers);
        List<Passenger> existingPassengers = flight.getPassengers();
        List<Passenger> passengers = new ArrayList<>();
        for (String seatNumber : seatNumbers) {
            int rowNumber = Integer.parseInt(seatNumber.substring(1));
            if (rowNumber >= 1 && rowNumber <= 2) {
                Seat newSeat = new Seat(flight.getFlightNo(), seatNumber, "Business Class", 250);
                seatService.saveSeat(newSeat);
            } else if (rowNumber >= 3 && rowNumber <= 5) {
                Seat newSeat = new Seat(flight.getFlightNo(), seatNumber, "Comfort Class", 140);
                seatService.saveSeat(newSeat);
            } else if (rowNumber >= 6 && rowNumber <= 13) {
                Seat newSeat = new Seat(flight.getFlightNo(), seatNumber, "Ordinary Class", 100);
                seatService.saveSeat(newSeat);
            }
            else {
                throw new IllegalArgumentException("Unknown seat class for seat number: " + seatNumber);
                }
            Passenger passenger = new Passenger(flight.getFlightNo(), seatNumber, name, email);
            passengers.add(passenger);
            passengerService.savePassenger(passenger);
        }  
        existingPassengers.addAll(passengers);
        flight.setPassengers(existingPassengers);
        Flight updatedFlight = flightService.saveFlight(flight);
        return ResponseEntity.ok(updatedFlight);
    }


    // Get id of flight by flightNo
    // Works
    @GetMapping("/{flightNo}/id")
    public ResponseEntity<Long> getFlightIdByFlightNo(@PathVariable String flightNo) {
        try {
            Flight flight = flightService.getFlightByFlightNo(flightNo);
            return ResponseEntity.ok(flight.getId());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


    // Update a flight by ID
    @PutMapping("/{id}") // PUT /api/flights/{id}
    public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @RequestBody Flight updatedFlight) {
        try {
            Flight updated = flightService.updateFlight(id, updatedFlight);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


    // Remove passengers from a flight by ID
    @PutMapping("/{id}/cancel-flight") // PUT /api/flights/{id}/remove-passengers
    public ResponseEntity<Flight> removePassengers(@PathVariable Long id, @RequestBody int paymentId) {
            Flight flight = flightService.getFlightById(id);
            Flight updated = flightService.cancelFlightOperations(paymentId, flight);
            return ResponseEntity.ok(updated);
    }


}
