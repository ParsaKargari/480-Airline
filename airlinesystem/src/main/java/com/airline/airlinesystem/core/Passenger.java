package com.airline.airlinesystem.core;

import jakarta.persistence.*;

@Entity
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String name;
    private String flightNo;
    private String seatNumber;
    private String email;

    public Passenger(){}
    
    public Passenger(String flightNo, String seatNo, String name, String email) {
        this.flightNo = flightNo;
        this.seatNumber = seatNo;
        this.name = name;
        this.email = email;
    }
    public String getFlightNo() {
        return flightNo;
    }
    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }
    public String getSeatNo() {
        return seatNumber;
    }
    public void setSeatNo(String seatNo) {
        this.seatNumber = seatNo;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

}