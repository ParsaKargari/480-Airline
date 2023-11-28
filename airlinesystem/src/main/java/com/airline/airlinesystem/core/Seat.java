package com.airline.airlinesystem.core;

// Seat Database

import jakarta.persistence.*;

@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key do not include in constructor

    private String seatNumber;
    private String seatClass;
    private boolean isAvailable;
    private double price;
    private String flightNo;

    // Default constructor
    public Seat() {
    }

    public Seat(String flightNo, String seatNumber, String seatClass, double price) {
        this.flightNo = flightNo;
        this.seatNumber = seatNumber;
        this.seatClass = seatClass;
        this.isAvailable = true;
        this.price = price;
    }

    // Getters and setters...

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(String seatClass) {
        this.seatClass = seatClass;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFlightNo() {
        return flightNo;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }
}

