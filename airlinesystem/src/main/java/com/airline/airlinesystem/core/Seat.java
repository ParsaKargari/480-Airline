package com.airline.airlinesystem.core;

public class Seat {
    private String seatNumber;
    private String seatClass;
    private boolean isAvailable;
    private double price;

    public Seat(String seatNumber, String seatClass, double price) {
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
}

