package com.dangProject.security.login;

import com.dangProject.member.dto.request.LoginRequest;
import com.dangProject.security.jwt.JwtHelper;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class LoginAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    public LoginAuthenticationFilter(String defaultUrl) {
        super(defaultUrl);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException, IOException, ServletException {
        LoginRequest loginReq = new ObjectMapper().readValue(req.getReader(), LoginRequest.class);
        LoginAuthenticationToken beforeToken = LoginAuthenticationToken.beforeOf(loginReq);
        return super.getAuthenticationManager().authenticate(beforeToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain, Authentication auth) throws IOException, ServletException {
        //다운 캐스팅
       LoginAuthenticationToken afterToken = (LoginAuthenticationToken) auth;
       String accessToken = afterToken.getAccessToken();
       String refreshToken = afterToken.getRefreshToken();

        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        Date expiration = JwtHelper.getClaim(refreshToken, Claims::getExpiration);
        int maxAge = (int) ((expiration.getTime() - new Date(System.currentTimeMillis()).getTime()) /1000);
        refreshTokenCookie.setMaxAge(maxAge); //만료시간

        res.addCookie(refreshTokenCookie);
        res.getWriter().println(accessToken); //response body에 acceessToken 담기
        res.setStatus(HttpServletResponse.SC_OK);
        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
    }
}
