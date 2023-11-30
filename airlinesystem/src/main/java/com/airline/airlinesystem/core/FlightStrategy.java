package com.airline.airlinesystem.core;

public class FlightStrategy implements FlightViewStrategy {

    @Override
    public void displayFlightInformation(Flight flight) {
        System.out.println("Flight Information:");
        System.out.println("Flight Number: " + flight.getFlightNo());
        System.out.println("Origin: " + flight.getOrigin());
        System.out.println("Destination: " + flight.getDestination());
        System.out.println("Crew Members:");

        if (flight.getCrew() != null) {
            for (String crewMember : flight.getCrew()) {
                System.out.println("  - " + crewMember);
            }
        }
    }
}
