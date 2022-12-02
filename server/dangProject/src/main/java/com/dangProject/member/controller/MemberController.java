package com.dangProject.member.controller;

import com.dangProject.member.dto.request.MemberUpdateDto;
import com.dangProject.member.dto.response.MemberDogResponse;
import com.dangProject.member.dto.response.MemberResponse;
import com.dangProject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;

    //닉네임 변경
    @PatchMapping("/me")
    public ResponseEntity<MemberResponse> update(@Valid @RequestBody MemberUpdateDto request) {
        Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(memberService.editProfile(request, memberId));
    }

    //특정 회원 정보 조회
    @GetMapping("/members/{id}")
    public ResponseEntity<MemberResponse> findMember(@PathVariable Long id) {
        return ResponseEntity.ok(memberService.findMember(id));
    }

    //특정 회원 정보 & 강아지 정보 같이 조회
    @GetMapping("/members/dogs/{id}")
    public ResponseEntity<MemberDogResponse> findMemberDog(@PathVariable Long id) {
        return ResponseEntity.ok(memberService.findMemberDog(id));
    }

    //회원 목록 전체 조회
    @GetMapping("/members")
    public ResponseEntity<List<MemberResponse>> findAllMembers() {
        return ResponseEntity.ok(memberService.findAllMembers());
    }

    //회원 자신의 정보 조회
    @GetMapping("/me")
    public ResponseEntity<MemberResponse> findMe() {
        Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(memberService.findMember(id));
    }

    //회원탈퇴
    @DeleteMapping("/me")
    public ResponseEntity deleteMember() {
        memberService.delete();
        return new ResponseEntity<>("회원 탈퇴 완료", HttpStatus.OK);
    }

    //로그아웃
    @GetMapping("/me/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        memberService.logout(request);
        return new ResponseEntity<>("로그아웃 성곰", HttpStatus.OK);
    }
}