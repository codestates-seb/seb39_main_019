package com.dangProject.member.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberPostDto {

    private String email;
    private String password;
    private String nickname;

}
