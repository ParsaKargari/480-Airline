package com.airline.airlinesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.airline.airlinesystem.core.User;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<User, Integer>{
    User findByUsernameAndPassword(String username, String password);
    User findByToken(String token);
    User findByEmail(String email);
    // return users with role "REGISTERED_USER"
    List<User> findByRole(String role);
}
