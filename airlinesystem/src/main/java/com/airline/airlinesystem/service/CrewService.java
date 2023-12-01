package com.airline.airlinesystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.airline.airlinesystem.core.Crew;
import com.airline.airlinesystem.core.Flight;
import com.airline.airlinesystem.repository.CrewRepository;
import com.airline.airlinesystem.repository.FlightRepository;
import javax.persistence.EntityNotFoundException;

import java.util.*;

@Service
public class CrewService {

    private final CrewRepository crewRepository;
    private final FlightRepository flightRepository;

    @Autowired
    public CrewService(CrewRepository crewRepository, FlightRepository flightRepository) {
        this.crewRepository = crewRepository;
        this.flightRepository = flightRepository;
    }

    public Crew saveCrew(Crew crewMember, String flightId) {
        Flight flight = flightRepository.findByFlightNo(flightId)
                .orElseThrow(() -> new EntityNotFoundException("Flight not found"));
        crewMember.setFlight(flight);
        return crewRepository.save(crewMember);
    }

    public void deleteCrew(String flightNo, String name) {
        crewRepository.deleteByFlightNoAndName(flightNo, name);
    }

    public List<Crew> getCrewByFlightNo(String flightId) {
        return crewRepository.findAllByFlightNo(flightId);
    }
}
