package com.airline.airlinesystem.core;

public interface AuthenticationStrategy {

    public User authenticate(String user, String password, String token);
}
