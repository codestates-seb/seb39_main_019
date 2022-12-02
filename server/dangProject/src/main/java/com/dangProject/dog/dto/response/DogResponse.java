package com.dangProject.dog.dto.response;

import com.dangProject.dog.domain.Dog;
import com.dangProject.member.dto.response.MemberResponse;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DogResponse {

    private Long id;
    private String dogNm;
    private String breed;
    private String sexNm;
    private int age;
    private MemberResponse memberResponse;

    public static DogResponse of(Dog dog) {
        return new DogResponse(dog.getId(), dog.getDogNm(), dog.getSexNm(), dog.getBreed(), dog.getAge(),
                new MemberResponse(dog.getMember().getId(), dog.getMember().getEmail(), dog.getMember().getNickname(), dog.getMember().getRole()));
    }
}
