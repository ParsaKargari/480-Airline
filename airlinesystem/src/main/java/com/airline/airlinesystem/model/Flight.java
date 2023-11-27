package com.airline.airlinesystem.model;

public class Flight {
    private int id;
    private String label;
    private String destination;
    private String origin;
    private String flightNumber;
    private String duration;

    public Flight(int id, String label, String destination, String origin, String flightNumber, String duration) {
        this.id = id;
        this.label = label;
        this.destination = destination;
        this.origin = origin;
        this.flightNumber = flightNumber;
        this.duration = duration;
    }

    public int getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public String getDestination() {
        return destination;
    }

    public String getOrigin() {
        return origin;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public String getDuration() {
        return duration;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    
}