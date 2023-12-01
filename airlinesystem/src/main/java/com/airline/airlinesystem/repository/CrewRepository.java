package com.airline.airlinesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.airline.airlinesystem.core.Crew;
import java.util.*;

@Repository
public interface CrewRepository extends JpaRepository<Crew, Integer> {
    // List<Crew> findAllByFlightNo(String flightNo);
    // void deleteByFlightNoAndName(String flightNo, String name);
}
