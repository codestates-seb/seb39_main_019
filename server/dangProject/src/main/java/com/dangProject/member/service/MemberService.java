package com.dangProject.member.service;

import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import com.dangProject.member.domain.Member;
import com.dangProject.member.domain.MemberRole;
import com.dangProject.member.domain.MemberType;
import com.dangProject.member.dto.request.MemberPostDto;
import com.dangProject.member.dto.response.MemberDogResponse;
import com.dangProject.member.dto.response.MemberResponse;
import com.dangProject.member.repository.MemberRepository;
import com.dangProject.member.repository.RefreshTokenRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder encoder;
    private final RefreshTokenRedisRepository redisRepository;
    private static final String HEADER_PREFIX = "Bearer ";

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

    //특정 회원 아이디로 정보 조회
    public MemberResponse findMember(Long id) {
        return memberRepository.findById(id)
                .map(MemberResponse::of)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //특정 회원 정보 및 강아지 조회
    public MemberDogResponse findMemberDog(Long id) {
        return memberRepository.findById(id)
                .map(MemberDogResponse::of)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //회원 목록 조회
    public List<MemberResponse> findAllMembers() {
       return memberRepository.findAll().stream()
                .map(MemberResponse::of)
                .collect(Collectors.toList());
    }

    //회원 탈퇴
    public void delete(Long id) {
        Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        memberRepository.deleteById(memberId);
    }

    //로그아웃
    public void logout(HttpServletRequest request) {

        //access token 블랙리스트에 넣기
        String accessToken = request.getHeader("Authorization");
        String accessTokenContent = accessToken.substring(HEADER_PREFIX.length());
        redisRepository.setBlackList("access_token", accessTokenContent, 30 * 60 * 1000L);
        //redis에서 access_token 으로 조회하면 들어가 있는데 거기 안에 있으면 오류를 날려야 하는데 그 처리를 못함
        //얘를 어디다 추가해줘야 할지..?
        if (redisRepository.hasKeyBlackList(accessTokenContent)) {
            throw new RuntimeException("토큰이 유효하지 않습니다.");
        }

        //refresh token 삭제
        Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        redisRepository.deleteValue(String.valueOf(memberId));

    }





    //회원 정보 검증
    public Member validate(String email, String password) throws RuntimeException {
        return memberRepository.findByEmail(email)
                .filter(member -> encoder.matches(password, member.getPassword()))
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Member verifyMember(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
