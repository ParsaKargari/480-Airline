package com.airline.airlinesystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final AccountService accountService;

    @Autowired
    public DatabaseInitializer(AccountService accountService) {
        this.accountService = accountService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize default users if not already initialized
        if (accountService.getAccountRepository().count() == 0) {
            accountService.initializeDefaultUsers();
        }
    }
}
