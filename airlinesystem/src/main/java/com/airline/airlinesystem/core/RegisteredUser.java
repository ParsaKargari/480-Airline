package com.airline.airlinesystem.core;

import jakarta.persistence.*;

@Entity
public class RegisteredUser extends User {

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "credit_card_id", referencedColumnName = "id")
    private CreditCard creditCard;
    private Boolean loungeDiscount;
    private Boolean freeTicket;
    private String useDate;

    public RegisteredUser() {
        super();
    }

    public RegisteredUser(String username, String password, String email,
            String name, String address, String dob, String role, String token) {
        super(username, password, email, name, address, dob, role, token);
    }

    public CreditCard getCreditCard() {
        return creditCard;
    }

    public void setCreditCard(CreditCard creditCard) {
        this.creditCard = creditCard;
    }

    public Boolean getLoungeDiscount() {
        return loungeDiscount;
    }

    public void setLoungeDiscount(Boolean loungeDiscount) {
        this.loungeDiscount = loungeDiscount;
    }

    public Boolean getFreeTicket() {
        return freeTicket;
    }

    public void setFreeTicket(Boolean freeTicket) {
        this.freeTicket = freeTicket;
    }

    public String getUseDate() {
        return useDate;
    }

    public void setUseDate(String useDate) {
        this.useDate = useDate;
    }

}
