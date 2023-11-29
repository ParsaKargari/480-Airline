package com.airline.airlinesystem.repository;

import com.airline.airlinesystem.core.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {
    Optional<Seat> findBySeatNumberAndFlightNo(String seatNo, String flightNo);
}
