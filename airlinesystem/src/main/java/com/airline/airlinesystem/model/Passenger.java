package com.airline.airlinesystem.model;

import javax.persistence.*;

@Entity
@Table(name = "passengers")
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;
    private String lastName;
    private String middleName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;

    public Passenger() {
    }

    public Passenger(String firstName, String lastName, String middleName, String email, String phone, String address, String city, String state, String zipCode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}
