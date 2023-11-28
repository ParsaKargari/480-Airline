package com.airline.airlinesystem.core;

import jakarta.persistence.*;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Transient
    private CreditCard creditCard;

    @Transient
    private Login login;

    private String username;
    private String name;
    private String address;
    private String dob;


    private String creditCardNum;
    private String creditCardExp;
    private String creditCardCvv;
    
    public Account(Login login, String name, String address, String dob, CreditCard creditCard) {
        this.login = login;
        this.username = login.getUsername();
        this.name = name;
        this.address = address;
        this.dob = dob;
        this.creditCard = creditCard;
        this.creditCardNum = creditCard.getNumber();
        this.creditCardExp = creditCard.getExpDate();
        this.creditCardCvv = creditCard.getCVV();
    }
        // Getters and setters
    
    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public CreditCard getCreditCard() {
        return creditCard;
    }

    public void setCreditCard(CreditCard creditCard) {
        this.creditCard = creditCard;
    }

    public String getCreditCardNum() {
        return creditCardNum;
    }
    public void setCreditCardNum(String creditCardNum) {
        this.creditCardNum = creditCardNum;
    }
    public String getCreditCardExp() {
        return creditCardExp;
    }
    public void setCreditCardExp(String creditCardExp) {
        this.creditCardExp = creditCardExp;
    }
    public String getCreditCardCvv() {
        return creditCardCvv;
    }
    public void setCreditCardCvv(String creditCardCvv) {
        this.creditCardCvv = creditCardCvv;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
