package Main.java.com.example.airline.service;


import Main.java.com.example.airline.model.Passenger;
import Main.java.com.example.airline.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerService {
    @Autowired
    private PassengerRepository passengerRepository;

    public List<Passenger> getAllPassengers() {
        return passengerRepository.findAll();
    }

    // Add other methods as needed
}
