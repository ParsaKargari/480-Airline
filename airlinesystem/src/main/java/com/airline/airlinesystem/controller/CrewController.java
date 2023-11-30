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

    @PostMapping
    public ResponseEntity<Crew> addCrew(@RequestBody Crew crewMember){
        Crew savedCrew = crewService.saveCrew(crewMember);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCrew);
    }
    @GetMapping("/{flightNo}")
    public ResponseEntity<List<Crew>> getAllCrewByFlightNo(@PathVariable String flightNo){
        return ResponseEntity.ok(crewService.getCrewByFlightNo(flightNo));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteCrew(@RequestBody Map<String, String> requestBody) {
        String name = requestBody.get("name");
        String flightNo =  requestBody.get("flightNo");
        crewService.deleteCrew(flightNo, name);
        return ResponseEntity.noContent().build();
    }

}
