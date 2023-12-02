package com.airline.airlinesystem.controller;

import com.airline.airlinesystem.core.*;
import com.airline.airlinesystem.service.AccountService;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.text.ParseException;
import java.text.SimpleDateFormat;

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

    // Get all registered users
    @GetMapping("/users") // GET /api/accounts/users
    public ResponseEntity<List<User>> getAllRegisteredUsers() {
        List<User> registeredUsers = accountService.getAccountRepository().findByRole("REGISTERED_USER");
        return ResponseEntity.ok(registeredUsers);
    }

    // Delete a registered user
    @DeleteMapping("/users/{id}") // DELETE /api/accounts/users/1
    public ResponseEntity<Map<String, Object>> deleteRegisteredUser(@PathVariable int id) {
        try {
            accountService.getAccountRepository().deleteById(id);
            return ResponseEntity.ok(Collections.singletonMap("success", "User deleted"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Error deleting user"));
        }
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
            // Check if the authenticated user is an instance of RegisteredUser
            if (authenticatedUser instanceof RegisteredUser) {
                RegisteredUser registeredUser = (RegisteredUser) authenticatedUser;
                if (registeredUser.getFreeTicket() != null && registeredUser.getUseDate() != null) {
                    String useDateString = registeredUser.getUseDate();
                    // Define the date format for "DD/MM/YY"
                    SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yy");
                    try {
                        // Parse the useDate string to a Date object
                        Date useDate = dateFormat.parse(useDateString);
                        // Compare with the current date to check if the year has passed
                        if (useDate.before(new Date())) {
                            registeredUser.setFreeTicket(true);
                            accountService.registerUser(registeredUser);
                        }
                    } catch (ParseException e) {
                        // Handle the parsing exception if the date string is not in the expected format
                        e.printStackTrace(); // or log the exception
                    }
                }
                return ResponseEntity.ok(registeredUser);
            } else {
                // If authenticatedUser is not a RegisteredUser, return it as is
                return ResponseEntity.ok(authenticatedUser);
            }
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
                    ((RegisteredUser) newUser).setLoungeDiscount(true);
                    ((RegisteredUser) newUser).setFreeTicket(true);

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

    @GetMapping("/news/{id}") // GET /api/accounts/users
    public ResponseEntity<Void> sendNews(@PathVariable int id) {
        try {
            User user = accountService.getAccountRepository().findById(id).orElse(null);
            if (user != null) {
                String email = user.getEmail();
                News news = new News();
                String subject = "Embark on Unforgettable Journeys with Moussavi Airlines - Unveiling Exclusive Deals!";
                String body = "We are thrilled to announce the launch of Moussavi Airlines' latest promotional offers, inviting you to experience travel like never before! As a valued passenger, you now have the opportunity to embark on unforgettable journeys at unbeatable prices.\n\nOur exclusive deals cover a wide range of destinations, ensuring that you can explore the world with comfort and style. Whether you're planning a business trip or a leisurely vacation, Moussavi Airlines is committed to providing you with exceptional service and a seamless travel experience.\n\nTake advantage of our limited-time promotions and elevate your travel adventures. Book your tickets now and let Moussavi Airlines be your passport to extraordinary destinations!";
                news.sendEmail(email, subject, body);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.noContent().build();
        }
    }

    // fetch user by id
    @GetMapping("/users/{id}") // GET /api/accounts/users/1
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = accountService.getAccountRepository().findById(id).orElse(null);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update Free Ticket and Lounge Access for a user
    @PutMapping("/users/{id}/update") // PUT /api/accounts/users/1/update
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable int id,
            @RequestBody Map<String, Object> updates) {
        try {
            Optional<User> optionalUser = accountService.getAccountRepository().findById(id);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                if (user instanceof RegisteredUser) {
                    RegisteredUser registeredUser = (RegisteredUser) user;
                    if (updates.containsKey("freeTicket")) {
                        registeredUser.setFreeTicket((Boolean) updates.get("freeTicket"));
                    }
                    if (updates.containsKey("loungeDiscount")) {
                        registeredUser.setLoungeDiscount((Boolean) updates.get("loungeDiscount"));
                    }
                    accountService.getAccountRepository().save(registeredUser);
                    return ResponseEntity.ok(Collections.singletonMap("success", "User updated"));
                } else {
                    return ResponseEntity.badRequest()
                            .body(Collections.singletonMap("error", "User is not a registered user"));
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Error updating user"));
        }
    }

}
