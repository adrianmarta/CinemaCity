package com.CinemaCity.CinemaCity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
public class CinemaCityApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinemaCityApplication.class, args);
	}

}
