package com.airline.airlinesystem.core;

import com.airline.airlinesystem.repository.AccountRepository;
import com.airline.airlinesystem.core.User;

public class UsernamePasswordAuthenticationStrategy implements AuthenticationStrategy {

    private final AccountRepository accountRepository;

    public UsernamePasswordAuthenticationStrategy(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public boolean authenticate(User user, String password) {
        User foundUser = accountRepository.findByUsernameAndPassword(user.getUsername(), password);
        return foundUser != null;
    }
}
