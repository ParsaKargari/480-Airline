package com.airline.airlinesystem.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.airline.airlinesystem.core.AuthenticationStrategy;
import com.airline.airlinesystem.core.CreditCard;
import com.airline.airlinesystem.core.RegisteredUser;
import com.airline.airlinesystem.core.User;
import com.airline.airlinesystem.repository.AccountRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public void initializeDefaultUsers() {
        List<User> defaultUsers = User.initializeDefaultUsers();
        accountRepository.saveAll(defaultUsers);
    }

    public AccountRepository getAccountRepository() {
        return accountRepository;
    }

    public User authenticate(String user, String password, String token,
            AuthenticationStrategy authenticationStrategy) {
        return authenticationStrategy.authenticate(user, password, token);
    }

    public void registerUser(User user) {
        accountRepository.save(user);
    }

}
