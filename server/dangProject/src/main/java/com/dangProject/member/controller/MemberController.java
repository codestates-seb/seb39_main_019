package com.dangProject.member.controller;

import com.dangProject.member.dto.request.MemberPatchDto;
import com.dangProject.member.dto.request.MemberPostDto;
import com.dangProject.member.dto.response.MemberDogResponse;
import com.dangProject.member.dto.response.MemberResponse;
import com.dangProject.member.service.MemberService;
import com.dangProject.post.dto.PostPageResponseDto;
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
@RequestMapping
public class MemberController {

    private final MemberService memberService;

    //회원가입
    @PostMapping("/auth/signup")
    public ResponseEntity<MemberResponse> register(@Valid @RequestBody MemberPostDto request) {
        return ResponseEntity.ok(memberService.registerGeneral(request));
    }

    //닉네임 변경
    @PatchMapping("/api/me")
    public ResponseEntity<MemberResponse> update(@Valid @RequestBody MemberPatchDto request) {
        Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(memberService.editProfile(request, memberId));
    }

    //특정 회원 정보 조회
    @GetMapping("/api/members/{id}")
    public ResponseEntity<MemberResponse> findMember(@PathVariable Long id) {
        return ResponseEntity.ok(memberService.findMember(id));
    }

    //특정 회원 정보 & 강아지 정보 같이 조회
    @GetMapping("/api/members/dogs/{id}")
    public ResponseEntity<MemberDogResponse> findMemberDog(@PathVariable Long id) {
        return ResponseEntity.ok(memberService.findMemberDog(id));
    }

    //회원 목록 전체 조회
    @GetMapping("/api/members")
    public ResponseEntity<List<MemberResponse>> findAllMembers() {
        return ResponseEntity.ok(memberService.findAllMembers());
    }

    //회원 자신의 정보 조회
    @GetMapping("/api/me")
    public ResponseEntity<MemberResponse> findMe() {
        Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(memberService.findMember(id));
    }

    //로그인한 사용자가 작성한 게시글 조회
    @GetMapping("api/me/posts")
    public ResponseEntity<List<PostPageResponseDto>> getMyPosts() {
        Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(memberService.getMyPosts(id));
    }

    //회원탈퇴
    @DeleteMapping("/api/me")
    public ResponseEntity deleteMember() {
        memberService.delete();
        return new ResponseEntity<>("회원 탈퇴 완료", HttpStatus.OK);
    }

    //로그아웃
    @GetMapping("/api/me/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        memberService.logout(request);
        return new ResponseEntity<>("로그아웃 성곰", HttpStatus.OK);
    }
}