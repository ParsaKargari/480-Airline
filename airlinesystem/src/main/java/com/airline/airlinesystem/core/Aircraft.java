package com.airline.airlinesystem.core;

public class Aircraft {
    private String aircraftId;
    private String model;
    private int capacity;
    private String airline;

    public Aircraft(String aircraftId, String model, int capacity, String airline) {
        this.aircraftId = aircraftId;
        this.model = model;
        this.capacity = capacity;
        this.airline = airline;
    }

    // Getters and setters

    public String getAircraftId() {
        return aircraftId;
    }

    public void setAircraftId(String aircraftId) {
        this.aircraftId = aircraftId;
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
