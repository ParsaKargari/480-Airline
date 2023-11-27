package com.airline.airlinesystem.core;

public class Receipt implements Email {
    private String transactionId;
    private double amount;
    private String recipientEmail;

    public Receipt(String transactionId, double amount, String recipientEmail) {
        this.transactionId = transactionId;
        this.amount = amount;
        this.recipientEmail = recipientEmail;
    }

    // Getters and setters...

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
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
        // Implement email sending logic here
        System.out.println("Sending receipt email to: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Transaction ID: " + transactionId);
        System.out.println("Amount: $" + amount);
        System.out.println("Recipient Email: " + recipientEmail);
        System.out.println("Email sent successfully!");
    }
}
