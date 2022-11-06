package com.dangProject.dog.repository;

import com.dangProject.dog.domain.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogRepository extends JpaRepository<Dog, Long> {
    boolean existsByDogRegNo(String dogRegNo);
}
