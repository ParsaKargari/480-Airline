package com.airline.airlinesystem.controller;

import com.airline.airlinesystem.core.Flight;
import com.airline.airlinesystem.core.Passenger;
import com.airline.airlinesystem.core.Seat;
import com.airline.airlinesystem.service.FlightService;
import com.airline.airlinesystem.service.SeatService;
import com.airline.airlinesystem.core.Aircraft;
import com.airline.airlinesystem.service.AircraftService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin
public class FlightController {
    @Autowired
    private FlightService flightService;

    @Autowired
    private AircraftService aircraftService;

    @Autowired
    private SeatService seatService;

    // Returns list of flights
    // Works
    @GetMapping // GET /api/flights
    public ResponseEntity<List<Flight>> getAllFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    // Add a flight
    // Works
    @PostMapping // POST /api/flights
    public ResponseEntity<Flight> addFlight(@RequestBody Flight flight) {
        Aircraft aircraft = flight.getAircraft();

        if (aircraft != null) {
            // Lookup aircraft by tail number
            Aircraft existingAircraft = aircraftService.findAircraftByTailNumber(aircraft.getTailNumber());

            if (existingAircraft != null) {
                // If aircraft exists, use it
                flight.setAircraft(existingAircraft);
            } else {
                // If aircraft doesn't exist, create a new one
                Aircraft newAircraft = aircraftService.saveAircraft(aircraft);
                flight.setAircraft(newAircraft);
            }
        }

        Flight savedFlight = flightService.saveFlight(flight);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFlight);
    }

    // Delete a flight by ID
    // Works
    @DeleteMapping("/{id}") // DELETE /api/flights/{id}
    public ResponseEntity<Void> deleteFlight(@PathVariable int id) {
        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }

    // Returns sold out seats for a flight
    // Works
    @GetMapping("/{flightNo}/seats/sold-out") // GET /api/flights/{id}/seats/sold-out
    public ResponseEntity<List<Seat>> getSoldOutSeats(@PathVariable String flightNo) {
        // Return list of sold out seats for a flight
        List<Seat> soldOutSeats = seatService.getSoldOutSeats(flightNo);
        return ResponseEntity.ok(soldOutSeats);
    }

    // Book seats for a flight by id
    // Works
    @PostMapping("/{id}/seats/book") // POST /api/flights/{id}/seats/book
    public ResponseEntity<Flight> bookSeats(@PathVariable int id, @RequestBody Map<String, Object> requestBody) {
        // Print the request body
        System.err.println(requestBody);
        String name = (String) requestBody.get("name");
        String email = (String) requestBody.get("email");
        List<String> seatNumbers = (List<String>) requestBody.get("seatNumbers");
        Flight flight = flightService.getFlightById(id);
        String ccNum = (String) requestBody.get("creditCardNum");
        String cvv = (String) requestBody.get("cvv");
        String expDate = (String) requestBody.get("expDate");
        Boolean useFreeTicket = (Boolean) requestBody.get("useFreeTicket");
        Integer amount = (Integer) requestBody.get("amount");
        Flight updatedFlight = flightService.bookFlight(flight, seatNumbers, email, name, ccNum, cvv, expDate,
                useFreeTicket, amount);
        return ResponseEntity.ok(updatedFlight);
    }

    // Get id of flight by flightNo
    // Works
    @GetMapping("/{flightNo}/id")
    public ResponseEntity<Integer> getFlightIdByFlightNo(@PathVariable String flightNo) {
        try {
            Flight flight = flightService.getFlightByFlightNo(flightNo);
            return ResponseEntity.ok(flight.getId());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a flight by ID
    @PutMapping("/{id}") // PUT /api/flights/{id}
    public ResponseEntity<Flight> updateFlight(@PathVariable int id, @RequestBody Flight updatedFlight) throws Exception{
        try {
            Flight updated = flightService.updateFlight(id, updatedFlight);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Remove passengers from a flight by ID
    @PutMapping("/{id}/cancel-flight") // PUT /api/flights/{id}/remove-passengers
    public ResponseEntity<Flight> removePassengers(@PathVariable int id,
            @RequestBody Map<String, Integer> requestBody) {
        int paymentId = requestBody.get("paymentId");
        Flight flight = flightService.getFlightById(id);
        try{
        Flight updated = flightService.cancelFlightOperations(paymentId, flight);
        return ResponseEntity.ok(updated);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.ok(flight);
    }

    @GetMapping("/{flightNo}/passenger") // GET /api/flights/{flightNo}/passenger
    public ResponseEntity<List<Passenger>> getPassengers(@PathVariable String flightNo) {
        Flight flight = flightService.getFlightByFlightNo(flightNo);
        List<Passenger> passengers = flight.getPassengers();
        return ResponseEntity.ok(passengers);
    }

}
