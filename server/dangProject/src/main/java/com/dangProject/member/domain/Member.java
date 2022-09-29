package com.dangProject.member.domain;

import com.dangProject.audit.BaseTime;
import com.dangProject.dog.domain.Dog;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Member extends BaseTime {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private long id;

    @Column(unique = true, nullable = false, length = 150)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false, length = 50)
    private String nickname;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 30, nullable = false)
    private MemberStatus memberStatus;

    @Enumerated(value = EnumType.STRING)
    private MemberType type;

    @Enumerated(value = EnumType.STRING)
    private MemberRole role;

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Dog> dogList = new ArrayList<Dog>();

    @Builder
    public Member(String email, String password, String nickname, MemberStatus memberStatus, MemberType type, MemberRole role) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.memberStatus = memberStatus;
        this.type = type;
        this.role = role;
    }


    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

    public void changeRole() {
        this.role = MemberRole.CERTIFIED;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }
}
