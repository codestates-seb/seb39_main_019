package com.dangProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@EnableJpaAuditing
@SpringBootApplication
public class DangProjectApplication {

	static {  System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true"); }

	public static void main(String[] args) {
		SpringApplication.run(DangProjectApplication.class, args);
	}
}
