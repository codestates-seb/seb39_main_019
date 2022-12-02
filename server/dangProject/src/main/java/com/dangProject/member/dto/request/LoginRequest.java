package com.dangProject.member.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "올바른 이메일을 입력해주세요.")
    private String email;

    @NotBlank(message = "올바른 비밀번호를 입력해주세요.")
    private String password;
}
