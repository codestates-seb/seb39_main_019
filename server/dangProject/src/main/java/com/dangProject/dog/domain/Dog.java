package com.dangProject.dog.domain;

import com.dangProject.audit.BaseTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Dog extends BaseTime {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dog_id")
    private Long id;

    @Column
    private String dogNm;

    @Column
    private String breed;

    @Column
    private String sexNm;

    @Column
    private int age;

    @Column
    private String dogRegNo;

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;

    @Builder
    public Dog(String dogNm, String sexNm, String dogRegNo , String breed, int age) {
        this.dogNm = dogNm;
        this.sexNm = sexNm;
        this.dogRegNo = dogRegNo;
        this.breed = breed;
        this.age = age;
    }

}
