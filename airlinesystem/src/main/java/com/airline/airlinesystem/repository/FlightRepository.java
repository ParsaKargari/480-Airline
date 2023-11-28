package com.airline.airlinesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.airline.airlinesystem.core.Flight;


@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    // Custom query methods can be defined here
}
