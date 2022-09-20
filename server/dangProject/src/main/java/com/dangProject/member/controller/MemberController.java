package com.dangProject.member.controller;

import com.dangProject.member.dto.request.MemberPostDto;
import com.dangProject.member.dto.response.MemberResponse;
import com.dangProject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/api/member/{id}")
    public ResponseEntity<MemberResponse> retrieveMember(@PathVariable Long id) {
        SecurityContextHolder.getContext().getAuthentication().getAuthorities().forEach(System.out::println);
        return ResponseEntity.ok(memberService.retrieveMember(id));
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<MemberResponse> register(@Valid @RequestBody MemberPostDto request) {
        return ResponseEntity.ok(memberService.register(request));
    }


}
