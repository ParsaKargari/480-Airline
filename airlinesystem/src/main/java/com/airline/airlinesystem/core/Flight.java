package com.airline.airlinesystem.core;

import java.util.ArrayList;
import java.util.List;

public class Flight {
    private Login login;
    private FlightViewStrategy flightStrategy;
    private String flightNo;
    private String destination;
    private String origin;
    private ArrayList<String> crew;
    private ArrayList<String> info;
    private List<Seat> seats;

    public Flight(Login login, FlightViewStrategy flightStrategy, String flightNo, String destination, String origin, ArrayList<String> crew, ArrayList<String> info, List<Seat> seats) {
        this.login = login;
        this.flightStrategy = flightStrategy;
        this.flightNo = flightNo;
        this.destination = destination;
        this.origin = origin;
        this.crew = crew;
        this.info = info;
        this.seats = seats;
    }

    // Getters and setters...

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
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

    public ArrayList<String> getCrew() {
        return crew;
    }

    public void setCrew(ArrayList<String> crew) {
        this.crew = crew;
    }

    public ArrayList<String> getInfo() {
        return info;
    }

    public void setInfo(ArrayList<String> info) {
        this.info = info;
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

    // Method to add information
    public void addInfo(String newInfo) {
        if (info == null) {
            info = new ArrayList<>();
        }
        info.add(newInfo);
    }

    // Method to remove information
    public void removeInfo(String information) {
        if (info != null) {
            info.remove(information);
        }
    }


    // seat methods
    public void addSeat(Seat seat) {
        seats.add(seat);
    }

    
    // Method to select seats (for booking)
    public List<Seat> selectSeats(int numberOfSeats) {
        List<Seat> selectedSeats = new ArrayList<>();

        for (Seat seat : seats) {
            if (seat.isAvailable()) {
                seat.setAvailable(false);
                selectedSeats.add(seat);

                if (selectedSeats.size() == numberOfSeats) {
                    break; // Stop selecting seats once the desired number is reached
                }
            }
        }

        return selectedSeats;
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
}
