package com.airline.airlinesystem.core;

import jakarta.persistence.*;

@Entity
public class Aircraft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String model;
    private int capacity;
    private String airline;

    public Aircraft(String model, int capacity, String airline) {
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
}
