package com.airline.airlinesystem.core;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
public class Aircraft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String tailNumber;
    private String model;
    private int capacity;
    private String airline;

    public Aircraft() {
    }

    public Aircraft(String tailNumber, String model, int capacity, String airline) {
        this.tailNumber = tailNumber;
        this.model = model;
        this.capacity = capacity;
        this.airline = airline;
    }

    // Getters and setters

    public int getId() {
        return id;
    }

    public void setId(int aircraftId) {
        this.id = aircraftId;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public void setTailNumber(String tailNumber) {
        this.tailNumber = tailNumber;
    }

    public String getTailNumber() {
        return tailNumber;
    }

    // Initialize default aircrafts
    public static List<Aircraft> initializeDefaultAircrafts() {
        List<Aircraft> aircrafts = new ArrayList<Aircraft>();
        aircrafts.add(new Aircraft("N12345", "Boeing 737", 150, "Moussavi Airlines"));
        aircrafts.add(new Aircraft("N23456", "Boeing 787 Dreamliner", 150, "Moussavi Airlines"));
        aircrafts.add(new Aircraft("N34567", "Airbus A380", 150, "Moussavi Airlines"));


        return aircrafts;
    }

    
}
