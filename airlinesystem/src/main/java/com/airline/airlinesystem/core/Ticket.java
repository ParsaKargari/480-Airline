package com.airline.airlinesystem.core;

public class Ticket implements Email {
    private String ticketNumber;
    private Flight flight;
    private Passenger passenger;
    private Seat seat;  // Add Seat field
    private double price;

    public Ticket(String ticketNumber, Flight flight, Passenger passenger, Seat seat, double price) {
        this.ticketNumber = ticketNumber;
        this.flight = flight;
        this.passenger = passenger;
        this.seat = seat;
        this.price = price;
    }

    // Getters and setters...

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public Passenger getPassenger() {
        return passenger;
    }

    public void setPassenger(Passenger passenger) {
        this.passenger = passenger;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    // Implementation of the sendEmail method from the Email interface
    @Override
    public void sendEmail(String to, String subject, String body) {
        // Implement email sending logic here
        System.out.println("Sending email to: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body: " + body);
        System.out.println("Email sent successfully!");
    }
}
