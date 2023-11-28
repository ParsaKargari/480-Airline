package com.airline.airlinesystem.service;
import org.springframework.beans.factory.annotation.Autowired;

import com.airline.airlinesystem.core.AuthenticationStrategy;
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

    public boolean loginUser(String username, String credential, AuthenticationStrategy strategy) {
        User user = new User();
        user.setUsername(username);
        return strategy.authenticate(user, credential);
    }

}
