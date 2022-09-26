package com.dangProject.security.login;

import com.dangProject.member.dto.request.LoginRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class LoginAuthenticationToken extends UsernamePasswordAuthenticationToken {

    //인증 전 객체
    public LoginAuthenticationToken(Object principal, Object credentials) {
        super(principal, credentials);
    }

    //인증 후 객체
    public LoginAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);
    }

    //인증 전 객체에서 principal 꺼낼 때 사용
    public String getEmail() {
        if (this.isAuthenticated()) {
            throw new RuntimeException();
        }
        return (String) this.getPrincipal();
    }

    //인증 전 객체에서 credentials 꺼낼 때 사용
    public String getPassword() {
        if (this.isAuthenticated()) {
            throw new RuntimeException();
        }
        return (String) this.getCredentials();
    }

    //인증 후 객체에서 accessToken 꺼낼 때 사용
    public String getAccessToken() {
        return ((JwtDto) this.getPrincipal()).getAccessToken();
    }

    //인증 후 객체에서 refreshToken 꺼낼 때 사용
    public String getRefreshToken() {
        return ((JwtDto) this.getPrincipal()).getRefreshToken();
    }

    //정적 팩토리 메소드를 추가해서 씀
    //인증 전
    public static LoginAuthenticationToken beforeOf(LoginRequest loginRequest) {
        return new LoginAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
    }

    //인증 후
    public static LoginAuthenticationToken afterOf(String accessToken, String refreshToken) {
        JwtDto jwt = new JwtDto(accessToken, refreshToken);
        return new LoginAuthenticationToken(jwt,"" ,List.of());
    }

    @Data
    @AllArgsConstructor
    static class JwtDto {
        String accessToken;
        String refreshToken;
    }

}
