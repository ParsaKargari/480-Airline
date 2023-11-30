package com.airline.airlinesystem.core;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import java.util.UUID;

@Entity
@Table(name = "accounts")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;
    private String email;
    private String name;
    private String address;
    private String dob;
    private String role;
    private String token;

    // Default constructor
    public User() {
        this.token = generateRandomToken();
    }

    // Constructor with fields
    public User(String username, String password, String email,
            String name, String address, String dob, String role, String token) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.address = address;
        this.dob = dob;
        this.role = role;
        this.token = token;
    }

    // Getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String setPassword(String password) {
        return this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public String setEmail(String email) {
        return this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public String setName(String name) {
        return this.name = name;
    }

    public String getName() {
        return name;
    }

    public String setAddress(String address) {
        return this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public String setDob(String dob) {
        return this.dob = dob;
    }

    public String getDob() {
        return dob;
    }

    public String setRole(String role) {
        return this.role = role;
    }

    public String getRole() {
        return role;
    }

    public String setToken(String token) {
        return this.token = token;
    }

    public String getToken() {
        return token;
    }

    public static String generateRandomToken() {
        return UUID.randomUUID().toString();
    }

    // ... Other getters and setters

    // Method to initialize default users
    public static List<User> initializeDefaultUsers() {
        List<User> defaultUsers = new ArrayList<>();
        defaultUsers.add(new User("admin", "adminpass", "admin@example.com",
                "Admin", "Admin Address", "1970-01-01", "ADMIN", "admin-token"));
        defaultUsers.add(new User("user", "userpass", "user@example.com",
                "User", "User Address", "1970-01-01", "USER", "user-token"));
        defaultUsers.add(new User("touragent", "touragentpass", "touragent@example.com",
                "Tour Agent", "Tour Agent Address", "1970-01-01", "TOUR_AGENT", "touragent-token"));
        defaultUsers.add(new User("airlineagent", "airlineagentpass", "airlineagent@example.com",
                "Airline Agent", "Airline Agent Address", "1970-01-01", "AIRLINE_AGENT", "airlineagent-token"));
        defaultUsers.add(new User("flightattendant", "flightattendantpass", "flightattendant@example.com",
                "Flight Attendant", "Flight Attendant Address", "1970-01-01", "FLIGHT_ATTENDANT",
                "flightattendant-token"));
        // Add other default users similarly for Tour Agent, Airline Agent, Flight
        // Attendant
        return defaultUsers;
    }
}
