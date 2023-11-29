package com.airline.airlinesystem.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.airline.airlinesystem.core.Payment;


@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer>{
    
}
