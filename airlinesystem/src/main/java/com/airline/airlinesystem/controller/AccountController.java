package com.airline.airlinesystem.controller;

import com.airline.airlinesystem.core.User;
import com.airline.airlinesystem.core.UsernamePasswordAuthenticationStrategy;
import com.airline.airlinesystem.core.AuthenticationStrategy;
import com.airline.airlinesystem.core.TokenAuthenticationStrategy;
import com.airline.airlinesystem.service.AccountService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        String token = credentials.get("token");

        AuthenticationStrategy strategy;

        if (token != null && !token.isEmpty()) {
            // Use token authentication strategy
            System.err.println("Token authentication strategy");
            strategy = new TokenAuthenticationStrategy(accountService.getAccountRepository());
        } else {
            // Use username/password authentication strategy
            System.err.println("Username/password authentication strategy");
            strategy = new UsernamePasswordAuthenticationStrategy(accountService.getAccountRepository());
        }

        User authenticatedUser = accountService.authenticate(username, password, token, strategy);

        if (authenticatedUser != null) {
            return ResponseEntity.ok(authenticatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

}
