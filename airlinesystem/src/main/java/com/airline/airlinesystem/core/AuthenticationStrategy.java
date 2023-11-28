package com.airline.airlinesystem.core;

public interface AuthenticationStrategy {
    boolean authenticate(User user, String credential);
}
