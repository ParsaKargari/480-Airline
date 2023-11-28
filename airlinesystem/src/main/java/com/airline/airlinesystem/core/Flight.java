package com.airline.airlinesystem.core;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

// Flight Database

@Entity
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key do not include in constructor

    @Transient // Do not include in database
    private Login login;

    @Transient // Do not include in database
    private FlightViewStrategy flightStrategy;

    private String flightNo;
    private String destination;
    private String origin;
    private String departureTime;
    private String duration;

    @Transient
    private List<String> crew;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "flight_id")
    private List<Seat> seats;

    // Default constructor
    public Flight() {
        // Add mock Flight data
        initializeSeats();
    }

    public Flight(Login login, FlightViewStrategy flightStrategy, String flightNo, String destination, String origin,
            List<String> crew, List<Seat> seats) {

        this.login = login;
        this.flightStrategy = flightStrategy;
        this.flightNo = flightNo;
        this.destination = destination;
        this.origin = origin;
        this.crew = crew;
        this.seats = seats;
    }

    // Initialize Seats
    public void initializeSeats() {
        this.seats = new ArrayList<>();

        // Your logic to add seats...

        // First class
        for (int i = 0; i < 2; i++) {
            for (char j = 'A'; j <= 'G'; j++) {
                String seatNumber = String.valueOf(j) + (i + 1);
                Seat seat = new Seat(seatNumber, "Business Class", 250);
                seats.add(seat); // No need to setFlight
            }
        }

        // Comfort class
        for (int i = 2; i < 5; i++) {
            for (char j = 'A'; j <= 'G'; j++) {
                String seatNumber = String.valueOf(j) + (i + 1);
                Seat seat = new Seat(seatNumber, "Comfort Class", 140);
                seats.add(seat); // No need to setFlight
            }
        }

        // Economy class
        for (int i = 5; i < 13; i++) {
            for (char j = 'A'; j <= 'G'; j++) {
                String seatNumber = String.valueOf(j) + (i + 1);
                Seat seat = new Seat(seatNumber, "Ordinary Class", 100);
                seats.add(seat); // No need to setFlight
            }
        }
    }

    // Getters and setters...

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDuration() {
        return duration;
    }

    public FlightViewStrategy getFlightStrategy() {
        return flightStrategy;
    }

    public void setFlightStrategy(FlightViewStrategy flightStrategy) {
        this.flightStrategy = flightStrategy;
    }

    public String getFlightNo() {
        return flightNo;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public List<String> getCrew() {
        return crew;
    }

    public void setCrew(List<String> crew) {
        this.crew = crew;
    }

    // Method to add a crew member
    public void addCrewMember(String crewMember) {
        if (crew == null) {
            crew = new ArrayList<>();
        }
        crew.add(crewMember);
    }

    // Method to remove a crew member
    public void removeCrewMember(String crewMember) {
        if (crew != null) {
            crew.remove(crewMember);
        }
    }

    // Method to add a destination
    public void addDestination(String newDestination) {
        this.destination = newDestination;
    }

    // Method to remove a destination
    public void removeDestination() {
        this.destination = null;
    }

    // seat methods
    public void addSeat(Seat seat) {
        seats.add(seat);
    }

    // Method to select seats (for booking)
    public void selectSeats(List<String> seatNumbers) {
        for (String seatNumber : seatNumbers) {
            for (Seat seat : seats) {
                if (seat.getSeatNumber().equals(seatNumber)) {
                    seat.setAvailable(false);
                }
            }
        }
    }

    public List<Seat> getSoldOutSeats() {
        List<Seat> soldOutSeats = new ArrayList<>();
        for (Seat seat : seats) {
            if (!seat.isAvailable()) {
                soldOutSeats.add(seat);
            }
        }
        return soldOutSeats;
    }

    // Method to browse available seats
    public List<Seat> browseSeats() {
        List<Seat> availableSeats = new ArrayList<>();

        for (Seat seat : seats) {
            if (seat.isAvailable()) {
                availableSeats.add(seat);
            }
        }

        return availableSeats;
    }

    // Return Id
    public Long getId() {
        return id;
    }
}
