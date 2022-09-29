package com.dangProject.security.login;

import com.dangProject.member.dto.request.LoginRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class LoginAuthenticationToken extends UsernamePasswordAuthenticationToken {

    public LoginAuthenticationToken(Object principal, Object credentials) {
        super(principal, credentials);
    }

    public LoginAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);
    }

    public String getEmail() {
        if (this.isAuthenticated()) {
            throw new RuntimeException();
        }
        return (String) this.getPrincipal();
    }

    public String getPassword() {
        if (this.isAuthenticated()) {
            throw new RuntimeException();
        }
        return (String) this.getCredentials();
    }

    public String getAccessToken() {
        return ((JwtDto) this.getPrincipal()).getAccessToken();
    }

    public String getRefreshToken() {
        return ((JwtDto) this.getPrincipal()).getRefreshToken();
    }

    public static LoginAuthenticationToken beforeOf(LoginRequest loginRequest) {
        return new LoginAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
    }

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
