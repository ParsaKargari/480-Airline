package com.airline.airlinesystem.controller;

import com.airline.airlinesystem.core.*;
import com.airline.airlinesystem.service.CrewService;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crew")
@CrossOrigin
public class CrewController {
    @Autowired
    CrewService crewService;

    @PostMapping("/{flightId}")
    public ResponseEntity<Crew> addCrew(@RequestBody Crew crewMember, @PathVariable String flightId) {
        Crew savedCrew = crewService.saveCrew(crewMember, flightId);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCrew);
    }

    @GetMapping("/{flightId}")
    public ResponseEntity<List<Crew>> getCrewByFlightNo(@PathVariable String flightId) {
        List<Crew> crew = crewService.getCrewByFlightNo(flightId);
        return ResponseEntity.ok(crew);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteCrew(@RequestBody Map<String, String> requestBody) {
        String name = requestBody.get("name");
        String flightNo = requestBody.get("flightNo");
        crewService.deleteCrew(flightNo, name);
        return ResponseEntity.noContent().build();
    }

}
