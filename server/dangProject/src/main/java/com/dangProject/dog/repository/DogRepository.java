package com.dangProject.dog.repository;

import com.dangProject.dog.domain.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DogRepository extends JpaRepository<Dog, Long> {
    Optional<Dog> findByDogRegNo(String dogRegNo);
}
