package com.airline.airlinesystem.repository;

import com.airline.airlinesystem.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Integer> {
    // You can add custom query methods here if needed
}
