package com.airline.airlinesystem.model;

import jakarta.persistence.*;

@Entity
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String flightNumber;
    private String operatingAirlines;
    private String departureCity;
    private String arrivalCity;
    private String dateOfDeparture;
    private String estimatedDepartureTime;

    public Flight() {
    }
}
