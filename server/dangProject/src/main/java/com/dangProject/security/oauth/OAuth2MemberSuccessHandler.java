package com.dangProject.security.oauth;

import com.dangProject.member.domain.Member;
import com.dangProject.member.repository.MemberRepository;
import com.dangProject.member.repository.RefreshTokenRedisRepository;
import com.dangProject.security.jwt.JwtHelper;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@Component
@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler implements AuthenticationSuccessHandler {

    private final MemberRepository memberRepository;
    private final RefreshTokenRedisRepository redisRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User user = ((CustomOAuth2User) authentication.getPrincipal());
        Long memberId = user.getMemberId();
        Member member = memberRepository.findById(memberId).orElseThrow();

        String accessToken = JwtHelper.generateAccessToken(member.getId(), member.getRole());
        String refreshToken = JwtHelper.generateRefreshToken(member.getId());
        redisRepository.save(member.getId(), refreshToken);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_OK);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }
}
