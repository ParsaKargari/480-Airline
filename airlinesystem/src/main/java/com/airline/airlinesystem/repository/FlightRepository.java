package com.airline.airlinesystem.repository;
import com.airline.airlinesystem.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {
}