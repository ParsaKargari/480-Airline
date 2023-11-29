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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ticketNumber;

    private String flightNo;
    private String email;
    private String name;
    private String seatNumber;
    private double price;
    private String seatClass;
    private int paymentId;

    // Add a default constructor
    public Ticket() {
        // Empty constructor
    }

    public Ticket(int paymentId, Flight flight, Passenger passenger, String seatNumber) {
        this.flight = flight;
        this.passenger = passenger;
        this.seatNumber = seatNumber;
        this.name = passenger.getName();
        this.email = passenger.getEmail();
        this.flightNo = flight.getFlightNo();
        this.paymentId = paymentId;

        int rowNumber = Integer.parseInt(seatNumber.substring(1));
        if (rowNumber >= 1 && rowNumber <= 2) {
            this.seatClass = "Business Class";
            this.price = 250;
        } else if (rowNumber >= 3 && rowNumber <= 5) {
            this.seatClass = "Comfort Class";
            this.price = 140;
        } else if (rowNumber >= 6 && rowNumber <= 13) {
            this.seatClass = "Ordinary Class";
            this.price = 100;
        }
        else {
            throw new IllegalArgumentException("Unknown seat class for seat number: " + seatNumber);
            }
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    // Implementation of the sendEmail method from the Email interface
    @Override
    public void sendEmail(String to, String subject, String body) {
        // // Replace these values with your actual email credentials
        // final String username = "your-email@gmail.com";
        // final String password = "your-email-password";
        // String newsSubject = "News: " + subject;
        // String newsBody = "News Content: " + body;

        // // Set the properties for the email session
        // Properties props = new Properties();
        // props.put("mail.smtp.auth", "true");
        // props.put("mail.smtp.starttls.enable", "true");
        // props.put("mail.smtp.host", "smtp.gmail.com");
        // props.put("mail.smtp.port", "587");

        // // Create a Session instance
        // Session session = Session.getInstance(props, new Authenticator() {
        //     @Override
        //     protected PasswordAuthentication getPasswordAuthentication() {
        //         return new PasswordAuthentication(username, password);
        //     }
        // });

        // try {
        //     // Create a MimeMessage object
        //     Message message = new MimeMessage(session);

        //     // Set the sender address
        //     message.setFrom(new InternetAddress(username));

        //     // Set the recipient address
        //     message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));

        //     // Set the email subject and body
        //     message.setSubject(newsSubject);
        //     message.setText(newsBody);

        //     // Send the email
        //     Transport.send(message);

        //     System.out.println("Email sent successfully!");

        // } catch (MessagingException e) {
        //     throw new RuntimeException(e);
        // }
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

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }
}
