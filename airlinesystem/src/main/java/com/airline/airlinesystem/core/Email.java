package com.airline.airlinesystem.core;

public interface Email {
    void sendEmail(String to, String subject, String body) throws Exception;
}
