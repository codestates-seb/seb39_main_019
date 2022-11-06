package com.dangProject.member.controller;

import com.dangProject.member.dto.request.MemberPostDto;
import com.dangProject.member.dto.response.MemberResponse;
import com.dangProject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<MemberResponse> register(@Valid @RequestBody MemberPostDto request) {
        return ResponseEntity.ok(memberService.registerGeneral(request));
    }
}
