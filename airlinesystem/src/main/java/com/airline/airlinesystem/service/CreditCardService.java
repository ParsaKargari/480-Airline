package com.airline.airlinesystem.service;
import org.springframework.beans.factory.annotation.Autowired;

import com.airline.airlinesystem.core.Account;
import com.airline.airlinesystem.core.CreditCard;
import com.airline.airlinesystem.repository.AccountRepository;

import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CreditCardService {
    
    private final AccountRepository accountRepository;

    @Autowired
    public CreditCardService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account saveCreditCard(int id, CreditCard creditCard){
        Account existingAccount = accountRepository.findById(id).orElse(null);
        if (existingAccount != null) {
            // Update the existing account with credit card information
            existingAccount.setCreditCardNum(creditCard.getNumber());
            existingAccount.setAddress(creditCard.getBillingAddress());
            existingAccount.setCreditCardCvv(creditCard.getCVV());

            // Save the updated account to the database
            return accountRepository.save(existingAccount);
        } else {
            // Handle the case where the account with the specified ID is not found
            // You may throw an exception or handle it based on your requirements
            return null;
        }
    }


}
