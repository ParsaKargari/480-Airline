package com.airline.airlinesystem.core;

import java.util.Properties;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import jakarta.persistence.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Entity
public class Receipt implements Email {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int paymentId;
    private double amount;
    private String recipientEmail;
    public Receipt(){}

    public Receipt(int paymentId, double amount, String recipientEmail) {
        this.paymentId = paymentId;
        this.amount = amount;
        this.recipientEmail = recipientEmail;
    }

    // Getters and setters...

    public int getId() {
        return id;
    }

    public void setId(int transactionId) {
        this.id = transactionId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

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

    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }
}
