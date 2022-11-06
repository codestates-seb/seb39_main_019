package com.dangProject.member.service;

import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import com.dangProject.member.domain.Member;
import com.dangProject.member.domain.MemberRole;
import com.dangProject.member.domain.MemberType;
import com.dangProject.member.dto.request.MemberPatchDto;
import com.dangProject.member.dto.request.MemberPostDto;
import com.dangProject.member.dto.response.MemberDogResponse;
import com.dangProject.member.dto.response.MemberResponse;
import com.dangProject.member.repository.MemberRepository;
import com.dangProject.member.repository.RefreshTokenRedisRepository;
import com.dangProject.post.domain.Post;
import com.dangProject.post.dto.PostPageResponseDto;
import com.dangProject.post.image.service.ImageService;
import com.dangProject.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder encoder;
    private final RefreshTokenRedisRepository redisRepository;
    private final PostRepository postRepository;
    private final ImageService imageService;
    private static final String HEADER_PREFIX = "Bearer ";

    //일반 회원가입
    public MemberResponse registerGeneral(MemberPostDto request) {
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

    //소셜 회원가입용
    public MemberResponse registerSocial(MemberPostDto request, MemberType type) {
        Member newMember = Member.builder()
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .memberStatus(Member.MemberStatus.MEMBER_ACTIVE)
                .type(type)
                .role(MemberRole.UNCERTIFIED)
                .build();

        Member createdMember = memberRepository.save(newMember);
        return MemberResponse.of(createdMember);
    }


    //닉네임 변경
    public MemberResponse editProfile(MemberPatchDto request, Long id) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.changeNickname(request.getNickname());
                    return memberRepository.save(member);
                })
                .map(MemberResponse::of)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //회원 권한 업데이트
    public MemberResponse certificate(Long id) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.changeRole();
                    return memberRepository.save(member);
                })
                .map(MemberResponse::of)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
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
    public void delete() {
        Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        memberRepository.deleteById(memberId);
        redisRepository.deleteValue(String.valueOf(memberId));
    }

    //로그아웃
    public void logout(HttpServletRequest request) {

        //access token 블랙리스트에 넣기
        String accessToken = request.getHeader("Authorization");
        String accessTokenContent = accessToken.substring(HEADER_PREFIX.length());
        redisRepository.setBlackList("access_token", accessTokenContent, 30 * 60 * 1000L); //시간 계산은 일단 안하고 임의의 시간 추가

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

    //회원 id로 조회
    public Member verifyMember(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //이메일로 멤버 정보 찾기
    public MemberResponse findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .map(MemberResponse::of)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //이메일 존재 여부 확인
    public boolean existsByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    //이메일 중복 검사
    public void verifyExistsEmail(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    //닉네임 중복 검사
    public void verifyExistsNickname(String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXISTS);
        }
    }
    //내가 작성한 게시글 불러오기
    public List<PostPageResponseDto> getMyPosts(Long id) {
        List<PostPageResponseDto> postDtoList = new ArrayList<>();
        List<Post> postList = postRepository.findAllByMemberId(id);

        for (Post post : postList) {
            postDtoList.add(
                    PostPageResponseDto.builder()
                            .postId(post.getId())
                            .title(post.getTitle())
                            .personality(post.getPersonality().getValue())
                            .size(post.getSize().getValue())
                            .guName(post.getGuName())
                            .imgUrl(imageService.findThmUrlByPostId(post.getId()))
                            .build());
        }
        return postDtoList;
    }
}
