package com.airline.airlinesystem.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airline.airlinesystem.core.Payment;
import com.airline.airlinesystem.repository.PaymentRepository;

@Service
public class PaymentService {
        
    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }


    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }
    public void deletePayment(int id) {
        paymentRepository.deleteById(id);
     }
}
