package com.airline.airlinesystem.core;

import java.util.Random;
import jakarta.persistence.*;

@Entity
@Table(name = "credit_cards")
public class CreditCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String cvv;
    private String cardHolder;
    private String billingAddress;
    private String expDate;
    private String number;

    public CreditCard(String name, String address) {
        this.cardHolder = name;
        this.billingAddress = address;

        // Generate random credit card information
        this.number = generateRandomCreditCardNumber();
        this.cvv = generateRandomCVV();
        this.expDate = generateRandomExpDate();
    }

    public String getCVV() {
        return cvv;
    }

    public String getCardHolder() {
        return cardHolder;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public String getExpDate() {
        return expDate;
    }

    public String getNumber() {
        return number;
    }

    public void setCVV(String cvv) {
        this.cvv = cvv;
    }

    public void setCardHolder(String cardHolder) {
        this.cardHolder = cardHolder;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public void setExpDate(String expDate) {
        this.expDate = expDate;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    private String generateRandomCreditCardNumber() {
        Random rand = new Random();
        StringBuilder cardNumber = new StringBuilder("4");
        for (int i = 1; i < 16; i++) {
            cardNumber.append(rand.nextInt(10));
            if (i % 4 == 0 && i != 16) {
                cardNumber.append(" ");
            }
        }

        return cardNumber.toString();
    }

    private String generateRandomCVV() {
        Random rand = new Random();
        StringBuilder cvv = new StringBuilder();

        for (int i = 0; i < 3; i++) {
            cvv.append(rand.nextInt(10));
        }

        return cvv.toString();
    }


    private String generateRandomExpDate() {
        Random rand = new Random();
        int currentYear = 2023;
        int year = currentYear + rand.nextInt(5); // Expiry date within the next 5 years
        int month = rand.nextInt(12) + 1; // Month between 1 and 12

        return String.format("%02d/%d", month, year);
    }
}
