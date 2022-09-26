package com.dangProject.dog.dto;

import lombok.*;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DogInfoPatchDto {

    private Long id;
    private String dogNm;
    private String breed;
    private String sexNm;
    private int age;

    @Builder
    public DogInfoPatchDto(String dogNm, String breed, String sexNm, int age) {
        this.dogNm = dogNm;
        this.breed = breed;
        this.sexNm = sexNm;
        this.age = age;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
