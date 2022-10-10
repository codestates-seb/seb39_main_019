package com.dangProject.security.jwt;

import com.dangProject.member.domain.MemberRole;
import com.dangProject.security.exception.CustomAuthenticationException;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        JwtAuthenticationToken beforeToken = (JwtAuthenticationToken) authentication;
        String accessToken = beforeToken.getAccessToken();

        try {
            if (!JwtHelper.validateJwt(accessToken)) {
                throw new CustomAuthenticationException("유효하지 않은 액세스 토큰입니다.");
            }
            //여기에 블랙리스트 검증 작업 추가할 예정
            long memberId = Long.parseLong(JwtHelper.getClaim(accessToken, Claims::getSubject));
            String role = (String) JwtHelper.getClaim(accessToken, claims -> claims.get("authorities"));
            MemberRole parsedRole = MemberRole.valueOf(role);

            return JwtAuthenticationToken.afterOf(memberId, parsedRole);
        } catch (RuntimeException e) {
            throw new CustomAuthenticationException("유효하지 않은 액세스 토큰입니다.", e);
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return JwtAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
