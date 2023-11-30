package com.airline.airlinesystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

import com.airline.airlinesystem.core.Aircraft;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final AccountService accountService;
    private final AircraftService aircraftService;
    private final FlightService flightService;

    @Autowired
    public DatabaseInitializer(AccountService accountService, AircraftService aircraftService,
            FlightService flightService) {
        this.accountService = accountService;
        this.aircraftService = aircraftService;
        this.flightService = flightService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize default users if not already initialized
        if (accountService.getAccountRepository().count() == 0) {
            accountService.initializeDefaultUsers();
        }

        // Initialize default aircrafts if not already initialized
        if (aircraftService.getAircraftRepository().count() == 0) {
            aircraftService.initializeDefaultAircrafts();
        }

                // Initialize default flights
        if (flightService.getFlightRepository().count() == 0) {
            List<Aircraft> aircrafts = aircraftService.getAllAircraft();
            flightService.initializeDefaultFlights(aircrafts);
        }

    }
}
