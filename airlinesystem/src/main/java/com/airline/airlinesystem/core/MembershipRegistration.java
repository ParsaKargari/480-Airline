package com.airline.airlinesystem.core;

import java.util.Random;

public class MembershipRegistration {
    Login login;
    String AccountID;

    public MembershipRegistration(String username, String password, String name, String DOB, String address){
        this.AccountID = makeSequence();

        /*
         *  ToDO:
         *  match parameters with database to add AccountID into the value of equivalent column.
         * 
         */
    }

    private String makeSequence(){
        /*
         *  Promise:    Generates an 8 digit sequence of random numbers
         *  Returns:
         *      String of 8 digit sequence in the following format of, #### ####
         */
        Random rand = new Random();
        StringBuilder cardNumber = new StringBuilder(8);
        for (int i = 0; i < 8; i++){
            cardNumber.append(rand.nextInt(10));
            if ((i % 4) == 0)
                cardNumber.append(" ");
        }
        return cardNumber.toString();
    }
}
