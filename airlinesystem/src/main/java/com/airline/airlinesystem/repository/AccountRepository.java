package com.airline.airlinesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.airline.airlinesystem.core.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer>{
    Account findByUsername(String username);
}
