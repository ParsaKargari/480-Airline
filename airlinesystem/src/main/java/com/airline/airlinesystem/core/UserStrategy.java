package com.airline.airlinesystem.core;

public class UserStrategy implements FlightViewStrategy {

    @Override
    public void displayFlightInformation(Flight flight) {
        System.out.println("Flight Information for Passengers:");
        System.out.println("Flight Number: " + flight.getFlightNo());
        System.out.println("Origin: " + flight.getOrigin());
        System.out.println("Destination: " + flight.getDestination());
        System.out.println("Crew Members:");

        if (flight.getCrew() != null) {
            for (String crewMember : flight.getCrew()) {
                System.out.println("  - " + crewMember);
            }
        }

        System.out.println("Seats:");

        if (flight.getSeats() != null) {
            for (Seat seat : flight.getSeats()) {
                System.out.println("  - Seat Number: " + seat.getSeatNumber() + ", Class: " + seat.getSeatClass() + ", Available: " + seat.isAvailable());
            }
        }
    }
}
