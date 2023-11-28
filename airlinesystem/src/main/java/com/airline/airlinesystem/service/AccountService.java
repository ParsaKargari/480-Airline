package com.airline.airlinesystem.service;
import org.springframework.beans.factory.annotation.Autowired;

import com.airline.airlinesystem.core.Account;
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

    public Account getAccountById(int id) {
        return accountRepository.findById(id).orElseThrow();
    }
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccount(String username){
        return accountRepository.findByUsername(username);
    }

    public Account updateAccount(Account account){
        Account existingAccount = accountRepository.findById(account.getId()).orElseThrow();
        existingAccount.setAddress(account.getAddress());
        existingAccount.setName(account.getName());
        return accountRepository.save(existingAccount);
    }

    
}
