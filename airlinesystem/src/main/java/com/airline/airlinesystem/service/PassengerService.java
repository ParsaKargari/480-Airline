package com.airline.airlinesystem.service;

import com.airline.airlinesystem.core.Passenger;
import com.airline.airlinesystem.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerService {

    private final PassengerRepository passengerRepository;

    @Autowired
    public PassengerService(PassengerRepository passengerRepository) {
        this.passengerRepository = passengerRepository;
    }

    public Passenger savePassenger(Passenger passenger) {
        return passengerRepository.save(passenger);
    }

    public List<Passenger> getAllPassengers() {
        return passengerRepository.findAll();
    }

    public Passenger getPassengerById(int id) {
        return passengerRepository.findById(id).orElse(null);
    }

    public void deletePassenger(int id) {
        passengerRepository.deleteById(id);
    }
}

