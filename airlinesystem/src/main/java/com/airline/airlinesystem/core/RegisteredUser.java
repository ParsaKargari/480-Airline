package com.airline.airlinesystem.core;

import jakarta.persistence.*;

@Entity
public class RegisteredUser extends User {

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "credit_card_id", referencedColumnName = "id")
    private CreditCard creditCard;

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

}
