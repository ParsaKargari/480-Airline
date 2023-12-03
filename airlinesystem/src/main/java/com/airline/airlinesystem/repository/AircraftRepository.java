package com.airline.airlinesystem.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.airline.airlinesystem.core.Aircraft;
import java.util.Optional;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, Integer>{
    Optional<Aircraft> findByTailNumber(String tailNumber);
}

