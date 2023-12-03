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

    public CreditCard() {
    }

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
        // 16-digit credit card number no spaces
        Random rand = new Random();
        StringBuilder cardNumber = new StringBuilder();

        for (int i = 0; i < 16; i++) {
            cardNumber.append(rand.nextInt(10));
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
        StringBuilder expDate = new StringBuilder();

        int month = rand.nextInt(12) + 1;
        int year = 25 + rand.nextInt(2);

        if (month < 10) {
            expDate.append("0");
        }
        expDate.append(month);
        expDate.append("/");
        expDate.append(year);

        return expDate.toString();

    }
}
