package Main.java.com.example.airline.repository;


import Main.java.com.example.airline.model.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
    // You can add custom query methods here if needed
}
