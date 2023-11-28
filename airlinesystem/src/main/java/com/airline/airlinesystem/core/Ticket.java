package com.airline.airlinesystem.core;
import java.util.Properties;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import jakarta.persistence.*;

@Entity
public class Ticket implements Email {
    @Transient
    private Flight flight;
    @Transient
    private Passenger passenger;
    @Transient
    private Seat seat;  // Add Seat field

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ticketNumber;

    private String flightNo;
    private String email;
    private String name;
    private String seatNo;
    private double price;
    private String seatClass;
    private int paymentId;

    public Ticket(int paymentId, Flight flight, Passenger passenger, Seat seat, double price) {
        this.flight = flight;
        this.passenger = passenger;
        this.seat = seat;
        this.price = price;
        this.seatNo = seat.getSeatNumber();
        this.seatClass = seat.getSeatClass();
        this.name = passenger.getName();
        this.email = passenger.getEmail();
        this.flightNo = flight.getFlightNo();
        this.paymentId = paymentId;
    }

    // Getters and setters...

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
        // Replace these values with your actual email credentials
        final String username = "your-email@gmail.com";
        final String password = "your-email-password";
        String newsSubject = "News: " + subject;
        String newsBody = "News Content: " + body;

        // Set the properties for the email session
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        // Create a Session instance
        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            // Create a MimeMessage object
            Message message = new MimeMessage(session);

            // Set the sender address
            message.setFrom(new InternetAddress(username));

            // Set the recipient address
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));

            // Set the email subject and body
            message.setSubject(newsSubject);
            message.setText(newsBody);

            // Send the email
            Transport.send(message);

            System.out.println("Email sent successfully!");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public String getFlightNo() {
        return flightNo;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSeatNo() {
        return seatNo;
    }

    public void setSeatNo(String seatNo) {
        this.seatNo = seatNo;
    }

    public String getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(String seatClass) {
        this.seatClass = seatClass;
    }

    public int getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(int ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }
}
