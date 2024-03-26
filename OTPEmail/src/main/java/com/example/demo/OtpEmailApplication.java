package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@ComponentScan(basePackages = {"com.otpemail.controller"}) 
public class OtpEmailApplication {

	public static void main(String[] args) {
		SpringApplication.run(OtpEmailApplication.class, args);
	}

    // Define a dummy DataSource bean to satisfy Spring Boot's requirement

}

