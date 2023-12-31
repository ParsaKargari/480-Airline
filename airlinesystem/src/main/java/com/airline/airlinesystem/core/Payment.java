package com.airline.airlinesystem.core;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.*;
import java.util.*;


@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Transient
    private List<Ticket> tickets;
    @Transient
    private Passenger passenger;
    @Transient
    private List<String> seats;
    @Transient
    private Flight flight;
    @Transient
    private Receipt receipt;
    @Transient
    private static int paymentId = 1;

    private String name;
    private String email;                       
    private double amount;
    private String cardNumber;
    private String expirationDate;
    private String cvv;

    private Boolean approved;
    

    // Constructors, getters, and setters...
    public Payment(){}
    public Payment(Passenger passenger, Flight flight, List<String> seatsNo, double amount, String cardNumber, String expirationDate, String cvv) {
        this.passenger = passenger;
        this.seats = seatsNo;
        this.email = passenger.getEmail();
        this.name = passenger.getName();
        this.flight = flight;
        this.amount = amount;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
        this.tickets = new ArrayList<>();
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


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yy");
        LocalDate expiration = LocalDate.parse("01/" + expirationDate, formatter);
        if(expiration.isBefore(LocalDate.now())){
            return false;
        }
        for (String seatNo : seats) {
            Ticket ticket = new Ticket(paymentId, flight, passenger, seatNo);
            tickets.add(ticket);
            String emailSubject = "Congratulations! Your Flight Booking and Payment are Confirmed";
            String emailBody = "Dear " + name + ",\n\n" +
                    "We are delighted to inform you that your payment for the flight booking has been successfully processed. " +
                    "Your seats for the upcoming flight have been confirmed, and the electronic tickets are attached to this email.\n\n" +
                    "Flight Details:\n" +
                    "- Flight Number: " + flight.getFlightNo() + "\n" +
                    "- Departure Date: " + flight.getDepartureDate() + "\n" +
                    "- Duration: " + flight.getDuration() + "\n" +
                    "- Seat Number: " + seatNo + "\n\n" +
                    "Passenger Details:\n" +
                    "- Name: " + name + "\n" +
                    "- Email: " + email + "\n\n" +
                    "We look forward to serving you on board. If you have any further inquiries or require assistance, feel free to contact our customer support.\n\n" +
                    "Thank you for choosing Moussavi Airlines! Have a pleasant journey.\n\n" +
                    "Best regards,\n" +
                    "Moussavi Airlines";
            try {
            ticket.sendEmail(email, emailSubject, emailBody);
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }   

        this.receipt = new Receipt(paymentId, amount, email);
        String emailSubject = "Receipt For Your Recent Booking With Moussavi Airlines";
        String emailBody = "Dear " + name + ",\n\n" +
        "Thank you for choosing Moussavi Airlines! We are pleased to provide you with the receipt for your recent booking.\n\n" +
        "Booking Details:\n" +
        "- Transaction ID: " + paymentId + "\n" +
        "- Total Amount Paid: $" + amount + "\n\n" +
        "We hope you have a pleasant journey with Moussavi Airlines. If you have any questions or need further assistance, feel free to contact our customer support.\n\n" +
        "Thank you for flying with us!\n\n" +
        "Best regards,\n" +
        "Moussavi Airlines";
        try {
            receipt.sendEmail(email, emailSubject, emailBody);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        paymentId++;
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

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Boolean getApproved() {
        return approved;
    }
    public void setApproved(Boolean approved) {
        this.approved = approved;
    }
    public List<String> getSeats() {
        return seats;
    }
    public void setSeats(List<String> seats) {
        this.seats = seats;
    }
    public Receipt getReceipt() {
        return receipt;
    }
    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
    }
}
