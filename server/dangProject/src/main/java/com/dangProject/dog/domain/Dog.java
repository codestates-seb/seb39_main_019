package com.dangProject.dog.domain;

import com.dangProject.audit.BaseTime;
import com.dangProject.member.domain.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @ManyToOne
    @JoinColumn(name = "memberId")
    @JsonBackReference
    private Member member;

    @Builder
    public Dog(String dogNm, String sexNm, String dogRegNo , String breed, int age, Member member) {
        this.dogNm = dogNm;
        this.sexNm = sexNm;
        this.dogRegNo = dogRegNo;
        this.breed = breed;
        this.age = age;
        this.member = member;
    }

    @Builder
    public Dog(String dogRegNo) {
        this.dogRegNo = dogRegNo;
    }
}
