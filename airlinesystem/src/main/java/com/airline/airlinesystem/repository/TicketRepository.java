package com.airline.airlinesystem.repository;

import com.airline.airlinesystem.core.Ticket;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findAllByPaymentId(int paymentId);
}
