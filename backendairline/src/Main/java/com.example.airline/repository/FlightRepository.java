package Main.java.com.example.airline.repository;

import Main.java.com.example.airline.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {

}
