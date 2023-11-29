package com.airline.airlinesystem.controller;

import com.airline.airlinesystem.core.*;
import com.airline.airlinesystem.service.AccountService;
import java.util.*;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin
public class AccountController {

    private final AccountService accountService;
    private final ObjectMapper objectMapper;

    @Autowired
    public AccountController(AccountService accountService) {
        this.objectMapper = new ObjectMapper();
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

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, Object> payload) {
        try {
            Map<String, Object> userInfo = (Map<String, Object>) payload.get("userInfo");
            User newUser;

            if ("REGISTERED_USER".equals(userInfo.get("role"))) {
                newUser = objectMapper.convertValue(userInfo, RegisteredUser.class);

                Map<String, String> creditCardInfo = (Map<String, String>) payload.get("creditCard");
                if (creditCardInfo != null) {
                    CreditCard creditCard = new CreditCard(
                            creditCardInfo.get("cardHolder"),
                            creditCardInfo.get("billingAddress"));
                    // Other credit card details will be set by the CreditCard constructor
                    ((RegisteredUser) newUser).setCreditCard(creditCard);
                }
            } else {
                newUser = objectMapper.convertValue(userInfo, User.class);
            }

            User savedUser = accountService.registerUser(newUser);

            // Prepare the response
            Map<String, Object> response = new HashMap<>();
            response.put("token", savedUser.getToken());

            if (savedUser instanceof RegisteredUser && ((RegisteredUser) savedUser).getCreditCard() != null) {
                CreditCard savedCreditCard = ((RegisteredUser) savedUser).getCreditCard();
                Map<String, String> creditCardDetails = new HashMap<>();
                creditCardDetails.put("number", savedCreditCard.getNumber());
                creditCardDetails.put("cvv", savedCreditCard.getCVV());
                creditCardDetails.put("expDate", savedCreditCard.getExpDate());
                response.put("creditCard", creditCardDetails);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Error processing registration"));
        }
    }

}
