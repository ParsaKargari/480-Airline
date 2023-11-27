package com.airline.airlinesystem.core;

public class Account {
    private Login login;
    private String accountID;
    private String name;
    private String address;
    private String dob;
    private CreditCard creditCard;
    
    public Account(Login login, String accountID, String name, String address, String dob, CreditCard creditCard) {
        this.login = login;
        this.accountID = accountID;
        this.name = name;
        this.address = address;
        this.dob = dob;
        this.creditCard = creditCard;
    }
        // Getters and setters
    
    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public String getAccountID() {
        return accountID;
    }

    public void setAccountID(String accountID) {
        this.accountID = accountID;
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
}
