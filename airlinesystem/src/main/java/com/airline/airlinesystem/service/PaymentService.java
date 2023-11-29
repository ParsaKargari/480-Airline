package com.airline.airlinesystem.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.airline.airlinesystem.core.Ticket;
import com.airline.airlinesystem.core.Payment;
import com.airline.airlinesystem.repository.PaymentRepository;
import com.airline.airlinesystem.repository.ReceiptRepository;
import com.airline.airlinesystem.repository.TicketRepository;

@Service
public class PaymentService {
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private ReceiptRepository receiptRepository;
        
    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Payment savePayment(Payment payment) {
        for(Ticket ticket: payment.getTickets()){
            ticketRepository.save(ticket);
        }
        receiptRepository.save(payment.getReceipt());
        return paymentRepository.save(payment);
    }
    public void deletePayment(int id) {
        paymentRepository.deleteById(id);
     }
}
