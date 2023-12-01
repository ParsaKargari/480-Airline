package com.airline.airlinesystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.airline.airlinesystem.core.Crew;
import com.airline.airlinesystem.repository.CrewRepository;
import java.util.*;
@Service
public class CrewService {

    private final CrewRepository crewRepository;

    @Autowired
    public CrewService(CrewRepository crewRepository){
        this.crewRepository = crewRepository;
    }
    
    // public void deleteCrew(String flightNo, String name){
    //     crewRepository.deleteByFlightNoAndName(flightNo, name);
    // }

    public Crew saveCrew(Crew crewMember){
        return crewRepository.save(crewMember);
    }
    
    // public List<Crew> getCrewByFlightNo(String flightNo){
    //     return crewRepository.findAllByFlightNo(flightNo);
    // }
}
