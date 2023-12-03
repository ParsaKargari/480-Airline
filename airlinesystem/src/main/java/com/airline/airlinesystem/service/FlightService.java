package com.airline.airlinesystem.service;

import com.airline.airlinesystem.core.Flight;
import com.airline.airlinesystem.core.Ticket;
import com.airline.airlinesystem.core.Passenger;
import com.airline.airlinesystem.core.Payment;
import com.airline.airlinesystem.core.Receipt;
import com.airline.airlinesystem.core.Seat;
import com.airline.airlinesystem.core.Aircraft;
import com.airline.airlinesystem.core.Crew;
import com.airline.airlinesystem.core.User;
import com.airline.airlinesystem.core.RegisteredUser;
import com.airline.airlinesystem.repository.CrewRepository;
import com.airline.airlinesystem.repository.FlightRepository;
import com.airline.airlinesystem.repository.PassengerRepository;
import com.airline.airlinesystem.repository.PaymentRepository;
import com.airline.airlinesystem.repository.TicketRepository;
import com.airline.airlinesystem.repository.ReceiptRepository;
import com.airline.airlinesystem.repository.SeatRepository;
import com.airline.airlinesystem.repository.AccountRepository;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlightService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ReceiptRepository receiptRepository;

    @Autowired
    private CrewRepository crewRepository;

    @Autowired
    private AccountRepository accountRepository;

    private final FlightRepository flightRepository;

    @Autowired
    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public FlightRepository getFlightRepository() {
        return flightRepository;
    }

    // Save flight to database
    public Flight saveFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public void initializeDefaultFlights(List<Aircraft> aircrafts) {
        List<Flight> flights = new ArrayList<>();

        // Realistic flight examples
        flights.add(new Flight("UA303", "San Francisco", "New York", "01-12-2023", "5h 30m",
                aircrafts.get(0)));
        flights.add(new Flight("DL105", "Atlanta", "London", "05-12-2023", "8h 15m",
                aircrafts.get(1)));
        flights.add(new Flight("AA786", "Dallas", "Tokyo", "08-12-2023", "13h 45m",
                aircrafts.get(2)));
        flights.add(new Flight("LH455", "Berlin", "San Francisco", "20-12-2023", "11h 20m",
                aircrafts.get(0)));
        flights.add(new Flight("QF12", "Sydney", "Los Angeles", "29-11-2023", "14h 30m",
                aircrafts.get(1)));
        flights.add(new Flight("EK241", "Dubai", "Toronto", "28-11-2023", "14h 00m", aircrafts.get(2)));
        flights.add(new Flight("SQ26", "Singapore", "Frankfurt", "03-12-2023", "12h 10m", aircrafts.get(0)));
        flights.add(new Flight("AF83", "Paris", "San Francisco", "02-12-2023", "11h 35m", aircrafts.get(1)));
        flights.add(new Flight("BA75", "London", "Lagos", "08-12-2023", "6h 50m", aircrafts.get(2)));

        // Save the flights to the database
        flightRepository.saveAll(flights);
    }

    // Delete flight from database
    public void deleteFlight(int id) {
        Flight flight = getFlightById(id);
        List<Passenger> passengers = flight.getPassengers();
        List<Crew> crew = flight.getCrew();
        List<Seat> seats = seatRepository.findAllByFlightNo(flight.getFlightNo());
        if (seats != null) {
            for (Seat seat : seats) {
                Ticket ticket = ticketRepository.findBySeatNumberAndFlightNo(seat.getSeatNumber(), flight.getFlightNo())
                        .orElse(null);
                if (ticket != null) {
                    Payment payment = paymentRepository.findById(ticket.getPaymentId()).orElse(null);
                    Receipt receipt = receiptRepository.findById(ticket.getPaymentId()).orElse(null);
                    if (payment != null) {
                        paymentRepository.delete(payment);
                    }
                    if (receipt != null) {
                        receiptRepository.delete(receipt);
                    }
                    ticketRepository.delete(ticket);
                }
                seatRepository.delete(seat);
            }
        }
        if (passengers != null) {
            for (Passenger passenger : passengers) {
                passengerRepository.delete(passenger);
            }
        }
        if (crew != null) {
            for (Crew crewMember : crew) {
                crewRepository.delete(crewMember);
            }
        }
        flightRepository.deleteById(id);
    }

    // Return all flights
    public List<Flight> getAllFlights() {
        List<Flight> flights = flightRepository.findAll();
        for (Flight flight : flights) {
            List<Seat> seats = seatRepository.findAllByFlightNo(flight.getFlightNo());
            List<String> seatNo = new ArrayList<>();
            List<Passenger> passengers = passengerRepository.findAllByFlightNo(flight.getFlightNo());
            List<Crew> crew = crewRepository.findAllByFlightNo(flight.getFlightNo());
            if (crew != null) {
                flight.setCrew(crew);
            }
            if (passengers != null) {
                flight.setPassengers(passengers);
            }
            if (seats != null) {
                for (Seat seat : seats) {
                    seatNo.add(seat.getSeatNumber());
                }
            }
            flight.initializeSeats();
            flight.selectSeats(seatNo);
        }
        return flights;
    }

    // Return flight by id
    public Flight getFlightById(int id) {
        Flight flight = flightRepository.findById(id).orElseThrow();
        flight.initializeSeats();
        List<Seat> seats = seatRepository.findAllByFlightNo(flight.getFlightNo());
        List<String> seatNo = new ArrayList<>();
        List<Passenger> passengers = passengerRepository.findAllByFlightNo(flight.getFlightNo());
        List<Crew> crew = crewRepository.findAllByFlightNo(flight.getFlightNo());
        if (crew != null) {
            flight.setCrew(crew);
        }
        if (passengers != null) {
            flight.setPassengers(passengers);
        }
        if (seats != null) {
            for (Seat seat : seats) {
                seatNo.add(seat.getSeatNumber());
            }
        }
        flight.selectSeats(seatNo);
        return flight;
    }

    // Return flight by flightNo
    public Flight getFlightByFlightNo(String flightNo) {
        Flight flight = flightRepository.findByFlightNo(flightNo)
                .orElseThrow(() -> new EntityNotFoundException("Flight not found with flightNo: " + flightNo));
        flight.initializeSeats();
        List<Seat> seats = seatRepository.findAllByFlightNo(flight.getFlightNo());
        List<String> seatNo = new ArrayList<>();
        List<Passenger> passengers = passengerRepository.findAllByFlightNo(flight.getFlightNo());
        List<Crew> crew = crewRepository.findAllByFlightNo(flight.getFlightNo());
        if (crew != null) {
            flight.setCrew(crew);
        }
        if (passengers != null) {
            flight.setPassengers(passengers);
        }
        if (seats != null) {
            for (Seat seat : seats) {
                seatNo.add(seat.getSeatNumber());
            }
        }
        flight.selectSeats(seatNo);
        return flight;
    }

    public Flight updateFlight(int id, Flight updatedFlight) {
        Flight existingFlight = getFlightById(id);

        existingFlight.setFlightNo(updatedFlight.getFlightNo());
        existingFlight.setDestination(updatedFlight.getDestination());
        existingFlight.setOrigin(updatedFlight.getOrigin());
        existingFlight.setDepartureDate(updatedFlight.getDepartureDate());
        existingFlight.setDuration(updatedFlight.getDuration());

        // Update the seats collection without replacing it
        existingFlight.getSeats().clear();
        if (updatedFlight.getSeats() != null) {
            existingFlight.getSeats().addAll(updatedFlight.getSeats());
        }

        return saveFlight(existingFlight);
    }

    public Flight bookFlight(Flight flight, List<String> seatNumbers, String email, String name, String creditCardNum,
            String cvv, String expDate, Boolean useFreeTicket, Integer amount) {
        flight.selectSeats(seatNumbers);
        if (useFreeTicket) {
            User user = accountRepository.findByEmail(email);
            if (user != null) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yy");
                String currentDate = dateFormat.format(new Date());
                ((RegisteredUser) user).setFreeTicket(false);
                ((RegisteredUser) user).setUseDate(currentDate);
                accountRepository.save(user);
            }
        }
        List<Passenger> existingPassengers = flight.getPassengers();
        if (existingPassengers == null) {
            existingPassengers = new ArrayList<>();
        }
        List<Passenger> passengers = new ArrayList<>();
        for (String seatNumber : seatNumbers) {
            int rowNumber = Integer.parseInt(seatNumber.substring(1));
            if (rowNumber >= 0 && rowNumber <= 1) {
                Seat newSeat = new Seat(flight.getFlightNo(), seatNumber, "Business Class", 250);
                newSeat.setAvailable(false);
                seatRepository.save(newSeat);
            } else if (rowNumber >= 2 && rowNumber <= 4) {
                Seat newSeat = new Seat(flight.getFlightNo(), seatNumber, "Comfort Class", 140);
                newSeat.setAvailable(false);
                seatRepository.save(newSeat);
            } else if (rowNumber >= 5 && rowNumber <= 12) {
                Seat newSeat = new Seat(flight.getFlightNo(), seatNumber, "Ordinary Class", 100);
                newSeat.setAvailable(false);
                seatRepository.save(newSeat);
            } else {
                throw new IllegalArgumentException("Unknown seat class for seat number: " + seatNumber);
            }
            Passenger passenger = new Passenger(flight.getFlightNo(), seatNumber, name, email);
            passengers.add(passenger);
            passengerRepository.save(passenger);
        }
        Payment payment = new Payment(passengers.get(0), flight, seatNumbers, amount, creditCardNum, expDate, cvv);
        paymentRepository.save(payment);
        for (Ticket ticket : payment.getTickets()) {
            ticketRepository.save(ticket);
        }
        receiptRepository.save(payment.getReceipt());
        existingPassengers.addAll(passengers);
        flight.setPassengers(existingPassengers);

        Flight updatedFlight = saveFlight(flight);
        return updatedFlight;
    }

    public Flight cancelFlightOperations(int paymentId, Flight flight) throws Exception{
        // Retrieve ticket information
        List<Ticket> tickets = ticketRepository.findAllByPaymentId(paymentId);
        Receipt receipt = receiptRepository.findByPaymentId(paymentId)
                .orElseThrow(() -> new EntityNotFoundException("Reciept not found"));
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found"));
        List<String> canceledSeatNumbers = new ArrayList<>();
        List<Passenger> canceledPassengers = new ArrayList<>();
        for (Ticket ticket : tickets) {
            String seatNo = ticket.getSeatNumber();
            Seat seat = seatRepository.findBySeatNumberAndFlightNo(seatNo, flight.getFlightNo())
                    .orElseThrow(() -> new EntityNotFoundException("Seat not found"));
            canceledSeatNumbers.add(seatNo);
            Passenger passenger = passengerRepository.findBySeatNumberAndFlightNo(seatNo, flight.getFlightNo())
                    .orElseThrow(() -> new EntityNotFoundException("Passenger not found"));
            canceledPassengers.add(passenger);
            passengerRepository.deleteById(passenger.getId());
            ticketRepository.deleteById(ticket.getTicketNumber());
            seatRepository.deleteById(seat.getId());
        }
        flight.addSeats(canceledSeatNumbers);
        List<Passenger> passengers = flight.getPassengers();
        if (passengers != null) {
            passengers.removeAll(canceledPassengers);
            flight.setPassengers(passengers);
        }
        String emailSubject = "Cancellation Confirmation for Your Recent Booking With Moussavi Airlines";
        String emailBody = "Hello,\n\n" +
                "We are writing this email to inform you that your recent booking with Moussavi Airlines has been canceled.\n\n" +
                "Cancellation Details:\n" +
                "- Transaction ID: " + receipt.getPaymentId() + "\n" +
                "- Total Amount Refunded: $" + receipt.getAmount()+ "\n\n" +
                "The refunded amount will be processed back to your original payment method within the next few business days.\n\n" +
                "If you have any further questions or concerns, please do not hesitate to contact our customer support team.\n\n" +
                "We appreciate your understanding and apologize for any inconvenience caused.\n\n" +
                "Thank you for considering Moussavi Airlines, and we hope to serve you in the future.\n\n" +
                "Best regards,\n" +
                "Moussavi Airlines";
        try {
            receipt.sendEmail(receipt.getRecipientEmail(), emailSubject, emailBody);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        paymentRepository.delete(payment);
        receiptRepository.delete(receipt);
        return saveFlight(flight);
    }
}
