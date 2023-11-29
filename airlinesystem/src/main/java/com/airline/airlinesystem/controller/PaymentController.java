package com.airline.airlinesystem.controller;

import com.airline.airlinesystem.core.Payment;
import com.airline.airlinesystem.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/payment")
@CrossOrigin
public class PaymentController {
    @Autowired
    private PaymentService paymentService;


    @PostMapping
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment) {
        Payment savedPayment = paymentService.savePayment(payment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPayment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable int id) {
        paymentService.deletePayment(id);
    return ResponseEntity.noContent().build();
    }
}
