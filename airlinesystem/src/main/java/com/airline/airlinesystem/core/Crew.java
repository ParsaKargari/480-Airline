package com.airline.airlinesystem.core;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class Crew {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int employeeID;
    private Employment employment;
    private String flightNo;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    @JsonBackReference
    private Flight flight;

    public Crew() {
    }

    public Crew(String name, int employeeID, Employment employment, String flightNo) {
        this.name = name;
        this.employeeID = employeeID;
        this.employment = employment;
        this.flightNo = flightNo;
    }

    public int getEmployeeID() {
        return this.employeeID;
    }

    public void setEmployeeID(int id) {
        this.employeeID = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Employment getEmployment() {
        return this.employment;
    }

    public void setEmployment(Employment employ) {
        this.employment = employ;
    }

    public String getFlightNo() {
        return this.flightNo;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Flight getFlight() {
        return this.flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

}
