package com.dangProject.member.service;

import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import com.dangProject.member.domain.Member;
import com.dangProject.member.domain.MemberRole;
import com.dangProject.member.domain.MemberType;
import com.dangProject.member.dto.request.MemberPostDto;
import com.dangProject.member.dto.response.MemberResponse;
import com.dangProject.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder encoder;

    //회원가입
    public MemberResponse register(MemberPostDto request) {
        Member newMember = Member.builder()
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .memberStatus(Member.MemberStatus.MEMBER_ACTIVE)
                .type(MemberType.GENERAL)
                .role(MemberRole.UNCERTIFIED)
                .build();

        Member createdMember = memberRepository.save(newMember);
        return MemberResponse.of(createdMember);
    }

    //회원 아이디 조회
    public MemberResponse findMember(Long id) {
        return memberRepository.findById(id)
                .map(MemberResponse::of)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //회원 목록 조회
    public List<MemberResponse> findAllMembers() {
       return memberRepository.findAll().stream()
                .map(MemberResponse::of)
                .collect(Collectors.toList());
    }

    //회원 정보 검증
    public Member validate(String email, String password) throws RuntimeException {
        return memberRepository.findByEmail(email)
                .filter(member -> encoder.matches(password, member.getPassword()))
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //회원 탈퇴
    public void delete(Long id) {
        memberRepository.findById(id);
        memberRepository.deleteById(id);
    }

}
