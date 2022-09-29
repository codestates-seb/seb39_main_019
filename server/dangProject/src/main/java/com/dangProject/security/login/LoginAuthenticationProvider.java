package com.dangProject.security.login;

import com.dangProject.member.domain.Member;
import com.dangProject.member.repository.RefreshTokenRedisRepository;
import com.dangProject.member.service.MemberService;
import com.dangProject.security.exception.CustomAuthenticationException;
import com.dangProject.security.jwt.JwtHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class LoginAuthenticationProvider implements AuthenticationProvider {

    private final MemberService memberService;
    private final RefreshTokenRedisRepository redisRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        LoginAuthenticationToken beforeToken = (LoginAuthenticationToken) authentication;

        try {
            Member member = memberService.validate(beforeToken.getEmail(), beforeToken.getPassword());
            String accessToken = JwtHelper.generateAccessToken(member.getId(), member.getRole());
            String refreshToken = JwtHelper.generateRefreshToken(member.getId());
            redisRepository.save(member.getId(), refreshToken);

            return LoginAuthenticationToken.afterOf(accessToken, refreshToken);
        } catch (Exception e) {
            throw new CustomAuthenticationException("사용자 인증에 실패했습니다.", e);
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return LoginAuthenticationToken.class.isAssignableFrom(authentication);
    }

}
