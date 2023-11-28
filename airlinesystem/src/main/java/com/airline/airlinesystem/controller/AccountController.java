package com.airline.airlinesystem.controller;

import com.airline.airlinesystem.core.Account;
import com.airline.airlinesystem.core.CreditCard;
import com.airline.airlinesystem.core.Login;
import com.airline.airlinesystem.service.CreditCardService;
import com.airline.airlinesystem.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin
public class AccountController {
    @Autowired
    private CreditCardService cardService;
    private AccountService accountService;

    @PutMapping("/{id}/addCreditCard")
    public ResponseEntity<Account> addCreditCard(@PathVariable int id,@RequestBody CreditCard creditCard){
        Account updatedAccount = cardService.saveCreditCard(id, creditCard);
        return ResponseEntity.ok(updatedAccount);
    }
    
    @PostMapping
    public ResponseEntity<Account> addAccount(@RequestBody Account account){
        Account savededAccount = accountService.saveAccount(account);
        return ResponseEntity.status(HttpStatus.CREATED).body(savededAccount);
    }

    @PutMapping 
    public ResponseEntity<Account> updateAccount(@RequestBody Account account){
        Account updatedAccount = accountService.updateAccount(account);
        return ResponseEntity.ok(updatedAccount);
    }
    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts(){
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @GetMapping
    public ResponseEntity<Account> getAccount(@RequestBody Login login){
        Account account = accountService.getAccount(login.getUsername());
        return ResponseEntity.ok(account);
    }
}
