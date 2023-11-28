package com.airline.airlinesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.airline.airlinesystem.core.Flight;
import java.util.Optional;


@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    Optional<Flight> findByFlightNo(String flightNo);
}
