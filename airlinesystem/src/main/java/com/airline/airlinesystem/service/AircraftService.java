package com.airline.airlinesystem.service;

import com.airline.airlinesystem.core.Aircraft;
import com.airline.airlinesystem.repository.AircraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class AircraftService {

    private final AircraftRepository aircraftRepository;

    @Autowired
    public AircraftService(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }

    public Aircraft saveAircraft(Aircraft aircraft) {
        return aircraftRepository.save(aircraft);
    }

    public List<Aircraft> getAllAircraft() {
        return aircraftRepository.findAll();
    }

    public Aircraft getAircraftById(int id) {
        Optional<Aircraft> optionalAircraft = aircraftRepository.findById(id);
        return optionalAircraft.orElse(null);
    }

    public Aircraft updateAircraft(int id, Aircraft aircraft) {
        Optional<Aircraft> optionalAircraft = aircraftRepository.findById(id);
        if (optionalAircraft.isPresent()) {
            Aircraft existingAircraft = optionalAircraft.get();
            existingAircraft.setModel(aircraft.getModel());
            existingAircraft.setCapacity(aircraft.getCapacity());
            return aircraftRepository.save(existingAircraft);
        } else {
            return null;
        }
    }

    public void deleteAircraft(int id) {
        aircraftRepository.deleteById(id);
    }

    public Aircraft findAircraftByTailNumber(String tailNumber) {
        return aircraftRepository.findByTailNumber(tailNumber)
                .orElseThrow(() -> new EntityNotFoundException("Aircraft not found"));
    }
}
