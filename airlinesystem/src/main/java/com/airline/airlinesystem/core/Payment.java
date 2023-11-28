package com.airline.airlinesystem.core;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.*;
import java.util.*;

// @Entity
public class Payment {
    private List<Ticket> tickets;
    private Passenger passenger;
    private List<Seat> seats;
    private Flight flight;

    private String name;
    private String email;                       
    private double amount;
    private String cardNumber;
    private String expirationDate;
    private String cvv;
    private String timestamp;
    private Boolean approved;
    

    // Constructors, getters, and setters...

    public Payment(Passenger passenger, Flight flight, double amount, String cardNumber, String expirationDate, String cvv, String timestamp) {
        this.passenger = passenger;
        this.seats = flight.getSeats();
        this.email = passenger.getEmail();
        this.name = passenger.getName();
        this.flight = flight;
        this.amount = amount;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
        this.timestamp = timestamp;
        this.approved = processPayment();

    }
    public boolean processPayment() {
        if(cardNumber == null || cardNumber.length() != 16){
            return false;
        }
        if (cvv == null || cvv.length() != 3) {
            return false;
        }


        if(expirationDate == null || expirationDate.length() != 5){
            return false;
        }


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yy");
        LocalDate expiration = LocalDate.parse("01/" + expirationDate, formatter);
        if(expiration.isBefore(LocalDate.now())){
            return false;
        }
        for (Seat seat : seats) {
            Ticket ticket = new Ticket(flight, passenger, seat, amount);
            tickets.add(ticket);
            String emailSubject = "Congratulations! Your Flight Booking and Payment are Confirmed";
            String emailBody = "Dear " + name + ",\n\n" +
                    "We are delighted to inform you that your payment for the flight booking has been successfully processed. " +
                    "Your seats for the upcoming flight have been confirmed, and the electronic tickets are attached to this email.\n\n" +
                    "Flight Details:\n" +
                    "- Flight Number: " + flight.getFlightNo() + "\n" +
                    "- Departure Date and Time: " + flight.getDepartureTime() + "\n" +
                    "- Duration: " + flight.getDuration() + "\n" +
                    "- Seat Number: " + seat.getSeatNumber() + "\n\n" +
                    "Passenger Details:\n" +
                    "- Name: " + name + "\n" +
                    "- Email: " + email + "\n\n" +
                    "We look forward to serving you on board. If you have any further inquiries or require assistance, feel free to contact our customer support.\n\n" +
                    "Thank you for choosing Moussavi Airlines! Have a pleasant journey.\n\n" +
                    "Best regards,\n" +
                    "Moussavi Airlines";
            ticket.sendEmail(email, emailSubject, emailBody);
        }   

        return true;
    }

    // Getters and setters...

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Passenger getPassenger() {
        return passenger;
    }

    public void setPassenger(Passenger passenger) {
        this.passenger = passenger;
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

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }
}
