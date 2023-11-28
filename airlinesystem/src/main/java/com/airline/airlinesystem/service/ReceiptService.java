package com.airline.airlinesystem.service;

import com.airline.airlinesystem.core.Receipt;
import com.airline.airlinesystem.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;

    @Autowired
    public ReceiptService(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    public Receipt saveReceipt(Receipt receipt) {
        return receiptRepository.save(receipt);
    }

    public Receipt getReceiptById(int id) {
        return receiptRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Receipt not found with id: " + id));
    }

    public void deleteReceipt(int id) {
        receiptRepository.deleteById(id);
    }
}
