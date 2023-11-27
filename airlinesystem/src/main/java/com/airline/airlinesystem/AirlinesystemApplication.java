package com.airline.airlinesystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

// Remove the Exclude for DataSourceAutoConfiguration to add the database back in
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class AirlinesystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(AirlinesystemApplication.class, args);
	}

}
