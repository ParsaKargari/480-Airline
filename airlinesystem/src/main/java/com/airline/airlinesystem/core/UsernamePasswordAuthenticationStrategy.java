package com.airline.airlinesystem.core;

import com.airline.airlinesystem.repository.AccountRepository;


public class UsernamePasswordAuthenticationStrategy implements AuthenticationStrategy {

    private final AccountRepository accountRepository;

    public UsernamePasswordAuthenticationStrategy(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public User authenticate(String user, String password, String token) {
        User foundUser = accountRepository.findByUsernameAndPassword(user, password);
        return foundUser;
    }
}
