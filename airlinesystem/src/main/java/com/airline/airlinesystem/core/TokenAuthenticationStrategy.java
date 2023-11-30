package com.airline.airlinesystem.core;

import com.airline.airlinesystem.repository.AccountRepository;

public class TokenAuthenticationStrategy implements AuthenticationStrategy {

    private final AccountRepository accountRepository;

    public TokenAuthenticationStrategy(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public User authenticate(String user, String password, String token) {
        User foundUser = accountRepository.findByToken(token);
        return foundUser;
    }
    
}
