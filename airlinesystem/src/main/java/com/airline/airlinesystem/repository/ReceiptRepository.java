package com.airline.airlinesystem.repository;

import com.airline.airlinesystem.core.Receipt;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {
    Optional<Receipt> findByPaymentId(int paymentId);
}
