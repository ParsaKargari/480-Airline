package com.airline.airlinesystem.core;

import java.util.List;

public class ReviewOrder {

    private List<Ticket> tickets;
    // private Passenger passenger;
    private Payment payment;

    public ReviewOrder(List<Ticket> tickets, Payment payment) {
        this.tickets = tickets;
        // this.passenger = passenger;
        this.payment = payment;
    }

    // Getters and setters...

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    // public Passenger getPassenger() {
    //     return passenger;
    // }

    // public void setPassenger(Passenger passenger) {
    //     this.passenger = passenger;
    // }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    // Method to display order details for review
    public void displayOrderDetails() {
        // Implement logic to display order details
        System.out.println("Order Details:");
        // System.out.println("Passenger: " + passenger.getFullName());
        System.out.println("Tickets:");

        for (Ticket ticket : tickets) {
            System.out.println("  - Ticket Number: " + ticket.getTicketNumber());
            // Display additional ticket details as needed
        }

        System.out.println("Payment Details:");
        System.out.println("  - Payment Method: " + payment.getPaymentMethod());
        System.out.println("  - Amount: $" + payment.getAmount());
        // Display additional payment details as needed
    }

    // Method to confirm the order
    public void confirmOrder() {
        // Implement logic to confirm the order
        System.out.println("Order confirmed. Thank you for your purchase!");
    }
}
