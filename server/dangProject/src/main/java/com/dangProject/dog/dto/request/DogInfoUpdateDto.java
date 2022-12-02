package com.dangProject.dog.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DogInfoUpdateDto {
    private Long id;
    private String dogNm;
    private String breed;
    private String sexNm;
    private int age;

    @Builder
    public DogInfoUpdateDto(String dogNm, String breed, String sexNm, int age) {
        this.dogNm = dogNm;
        this.breed = breed;
        this.sexNm = sexNm;
        this.age = age;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
