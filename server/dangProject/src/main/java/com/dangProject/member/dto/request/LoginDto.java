package com.dangProject.member.dto.request;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {

    private String email;
    private String password;
}
