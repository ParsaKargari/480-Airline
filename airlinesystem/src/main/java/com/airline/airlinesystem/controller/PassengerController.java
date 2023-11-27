// package com.airline.airlinesystem.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import com.airline.airlinesystem.model.Passenger;
// import com.airline.airlinesystem.service.PassengerService;
// import java.util.List;

// @RestController
// @RequestMapping("/api/passengers")
// @CrossOrigin
// public class PassengerController {
//     @Autowired
//     private PassengerService passengerService;

//     // Returns list of passengers
//     @GetMapping // GET /api/passengers
//     public ResponseEntity<List<Passenger>> getAllPassengers() {
//         System.out.println("GET /api/passengers");
//         return ResponseEntity.ok(passengerService.getAllPassengers());
//     }

// }
