package com.airline.airlinesystem.controller;

import com.airline.airlinesystem.core.Aircraft;
import com.airline.airlinesystem.service.AircraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aircraft")
@CrossOrigin
public class AircraftController {
    @Autowired
    private AircraftService aircraftService;

    @PostMapping
    public ResponseEntity<Aircraft> addAircraft(@RequestBody Aircraft aircraft) {
        Aircraft savedAircraft = aircraftService.saveAircraft(aircraft);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAircraft);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aircraft> updateAircraft(@PathVariable int id, @RequestBody Aircraft aircraft) {
        Aircraft updatedAircraft = aircraftService.updateAircraft(id, aircraft);
        if (updatedAircraft != null) {
            return ResponseEntity.ok(updatedAircraft);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Aircraft>> getAllAircraft() {
        List<Aircraft> aircraftList = aircraftService.getAllAircraft();
        return ResponseEntity.ok(aircraftList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aircraft> getAircraftById(@PathVariable int id) {
        Aircraft aircraft = aircraftService.getAircraftById(id);
        if (aircraft != null) {
            return ResponseEntity.ok(aircraft);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAircraft(@PathVariable int id) {
        aircraftService.deleteAircraft(id);
        return ResponseEntity.noContent().build();
    }
}
