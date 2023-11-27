package Main.java.com.example.airline.model;


import javax.persistence.*;

@Entity
@Table(name = "passengers")
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String seat;
    private String seatType;

    // getters and setters
}

