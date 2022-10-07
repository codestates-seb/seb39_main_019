package com.dangProject.dog.dto;

import com.dangProject.dog.domain.Dog;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DogInfoResponse {

    private Long id;
    private String dogNm;
    private String breed;
    private String sexNm;
    private int age;

    public static DogInfoResponse of(Dog dog) {
        return new DogInfoResponse(dog.getId(), dog.getDogNm(), dog.getBreed(), dog.getSexNm(), dog.getAge());
    }

}
