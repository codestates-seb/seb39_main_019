package com.dangProject.member.dto.request;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    private String email;
    private String password;
}
