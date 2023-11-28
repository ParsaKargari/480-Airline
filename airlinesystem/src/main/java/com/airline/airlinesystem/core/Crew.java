package com.airline.airlinesystem.core;

public class Crew {
    private int employeeID;
    private Employment employment;

    public Crew(int id, Employment employ){
        this.employeeID = id;
        this.employment = employ;
    }

    public int getEmployeeID(){
        return this.employeeID;
    }

    public void setEmployeeID(int id){
        this.employeeID = id;
    }

    public Employment getEmployment(){
        return this.employment;
    }

    public void setEmployment(Employment employ){
        this.employment = employ;
    }
}

