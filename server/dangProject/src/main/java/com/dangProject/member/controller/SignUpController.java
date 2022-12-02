package com.dangProject.member.controller;

import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import com.dangProject.member.dto.request.MemberRequestDto;
import com.dangProject.member.dto.response.MemberResponse;
import com.dangProject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class SignUpController {

    private final MemberService memberService;

    //회원가입
    @PostMapping("/auth/signup")
    public ResponseEntity<MemberResponse> register(@Valid @RequestBody MemberRequestDto request, Errors errors) {
        if (errors.hasErrors()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_INPUT_FORMAT);
        }
        return ResponseEntity.ok(memberService.register(request));
    }
}
