package com.dangProject.dog.dto.request;

import lombok.*;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DogInfoRequestDto {

    private Long id;
    private String dogNm;
    private String breed;
    private String sexNm;
    private int age;
    private Long memberId;

    @Builder
    public DogInfoRequestDto(String dogNm, String breed, String sexNm, int age) {
        this.dogNm = dogNm;
        this.breed = breed;
        this.sexNm = sexNm;
        this.age = age;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
