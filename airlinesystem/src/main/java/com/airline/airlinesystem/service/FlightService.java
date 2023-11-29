package com.airline.airlinesystem.service;

import com.airline.airlinesystem.core.Flight;
import com.airline.airlinesystem.core.Ticket;
import com.airline.airlinesystem.core.Passenger;
import com.airline.airlinesystem.core.Payment;
import com.airline.airlinesystem.core.Receipt;
import com.airline.airlinesystem.core.Seat;
import com.airline.airlinesystem.repository.FlightRepository;
import com.airline.airlinesystem.repository.PassengerRepository;
import com.airline.airlinesystem.repository.PaymentRepository;
import com.airline.airlinesystem.repository.TicketRepository;
import com.airline.airlinesystem.repository.ReceiptRepository;
import com.airline.airlinesystem.repository.SeatRepository;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    private final FlightRepository flightRepository;

    @Autowired
    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    // Save flight to database
    public Flight saveFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    // Delete flight from database
    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }

    // Return all flights
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    // Return flight by id
    public Flight getFlightById(Long id) {
        return flightRepository.findById(id).orElseThrow();
    }

    // Return flight by flightNo
    public Flight getFlightByFlightNo(String flightNo) {
        return flightRepository.findByFlightNo(flightNo)
                .orElseThrow(() -> new EntityNotFoundException("Flight not found with flightNo: " + flightNo));
    }

    // Update flight
    public Flight updateFlight(Long id, Flight updatedFlight) {
        Flight existingFlight = getFlightById(id);

        // Update the fields of the existing flight with the values from the updatedFlight
        existingFlight.setFlightNo(updatedFlight.getFlightNo());
        existingFlight.setDestination(updatedFlight.getDestination());
        existingFlight.setOrigin(updatedFlight.getOrigin());
        existingFlight.setDepartureDate(updatedFlight.getDepartureDate());
        existingFlight.setDuration(updatedFlight.getDuration());
        // Save the updated flight
        return saveFlight(existingFlight);
    }

    public Flight bookFlight(Flight flight, List<String> seatNumbers, String email, String name, String creditCardNum, String cvv, String expDate){
        flight.selectSeats(seatNumbers);
        List<Passenger> existingPassengers = flight.getPassengers();
        if (existingPassengers == null) {
            existingPassengers = new ArrayList<>();
        }
        List<Passenger> passengers = new ArrayList<>();
        double amount = 0;
        for (String seatNumber : seatNumbers) {
            int rowNumber = Integer.parseInt(seatNumber.substring(1));
            if (rowNumber >= 1 && rowNumber <= 2) {
                Seat newSeat = new Seat(flight.getFlightNo(), seatNumber, "Business Class", 250);
                amount += 250;
                seatRepository.save(newSeat);
            } else if (rowNumber >= 3 && rowNumber <= 5) {
                Seat newSeat = new Seat(flight.getFlightNo(), seatNumber, "Comfort Class", 140);
                seatRepository.save(newSeat);
                amount += 140;
            } else if (rowNumber >= 6 && rowNumber <= 13) {
                Seat newSeat = new Seat(flight.getFlightNo(), seatNumber, "Ordinary Class", 100);
                seatRepository.save(newSeat);
                amount += 100;
            }
            else {
                throw new IllegalArgumentException("Unknown seat class for seat number: " + seatNumber);
                }
            Passenger passenger = new Passenger(flight.getFlightNo(), seatNumber, name, email);
            passengers.add(passenger);
            passengerRepository.save(passenger);
        }  
        Payment payment = new Payment(passengers.get(0),flight,seatNumbers, amount, creditCardNum, expDate, cvv);
        paymentRepository.save(payment);
        for(Ticket ticket : payment.getTickets()){
            ticketRepository.save(ticket);
        }
        receiptRepository.save(payment.getReceipt());
        existingPassengers.addAll(passengers);
        flight.setPassengers(existingPassengers);
        Flight updatedFlight = saveFlight(flight);
        return updatedFlight;
    }

    public Flight cancelFlightOperations(int paymentId, Flight flight){
        // Retrieve ticket information
        List<Ticket> tickets = ticketRepository.findAllByPaymentId(paymentId);
        Receipt receipt = receiptRepository.findByPaymentId(paymentId).orElseThrow(() -> new EntityNotFoundException("Reciept not found"));
        Payment payment = paymentRepository.findById(paymentId).orElseThrow(() -> new EntityNotFoundException("Payment not found"));
        List<String> canceledSeatNumbers = new ArrayList<>();
        List<Passenger> canceledPassengers = new ArrayList<>();
        for (Ticket ticket : tickets) {
            // Retrieve additional information for each ticket, e.g., seat number, passenger
            String seatNo = ticket.getSeatNumber();
            Seat seat = seatRepository.findBySeatNumberAndFlightNo(seatNo, flight.getFlightNo()).orElseThrow(() -> new EntityNotFoundException("Seat not found"));
            canceledSeatNumbers.add(seatNo);
            Passenger passenger = passengerRepository.findBySeatNumberAndFlightNo(seatNo, flight.getFlightNo()).orElseThrow(() -> new EntityNotFoundException("Passenger not found"));
            canceledPassengers.add(passenger);
            passengerRepository.deleteById(passenger.getId());
            ticketRepository.deleteById(ticket.getTicketNumber());
            seatRepository.deleteById(seat.getId());
        }
        flight.addSeats(canceledSeatNumbers);
        List<Passenger> passengers = flight.getPassengers();
        if(passengers != null){
            passengers.removeAll(canceledPassengers);
            flight.setPassengers(passengers);
        }
        paymentRepository.delete(payment);
        receiptRepository.delete(receipt);
        return saveFlight(flight);
}
}
