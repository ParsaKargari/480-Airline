package com.airline.airlinesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.airline.airlinesystem.core.User;

@Repository
public interface AccountRepository extends JpaRepository<User, Integer>{
    User findByUsernameAndPassword(String username, String password);
    User findByToken(String token);
}
