package com.airline.airlinesystem.core;

public class Login {
    private static Login instance;

    private String username;
    private String password;

    private Login(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public static Login getInstance(String username, String password) {
        if (instance == null) {
            instance = new Login(username, password);
        }
        return instance;
    }

    // Getters and setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Authentication method
    public boolean authenticate(String enteredUsername, String enteredPassword) {
        return this.username.equals(enteredUsername) && this.password.equals(enteredPassword);
    }
}
