package com.airline.airlinesystem.repository;

import com.airline.airlinesystem.core.Passenger;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Integer> {
    Optional<Passenger> findBySeatNumberAndFlightNo(String seatNo, String flightNo);
    List<Passenger> findAllByFlightNo(String flightNo);
}
