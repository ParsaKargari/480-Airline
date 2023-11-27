package Main.java.com.example.airline.model;

import javax.persistence.*;

@Entity
@Table(name = "flights")
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;
    private String destination;
    private String origin;
    private String flightNumber;
    private String duration;

    // getters and setters
}

