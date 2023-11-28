package com.airline.airlinesystem.core;

import com.airline.airlinesystem.repository.AccountRepository;
import com.airline.airlinesystem.core.User;

public class TokenAuthenticationStrategy implements AuthenticationStrategy {

    private final AccountRepository accountRepository;

    public TokenAuthenticationStrategy(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public boolean authenticate(User user, String token) {
        User foundUser = accountRepository.findByToken(token);
        return foundUser != null;
    }
}
