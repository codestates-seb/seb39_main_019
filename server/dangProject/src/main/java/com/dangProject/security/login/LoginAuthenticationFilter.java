package com.dangProject.security.login;

import com.dangProject.member.dto.request.LoginRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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

       LoginAuthenticationToken afterToken = (LoginAuthenticationToken) auth;
       String accessToken = afterToken.getAccessToken();
       String refreshToken = afterToken.getRefreshToken();

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);
        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.setStatus(HttpServletResponse.SC_OK);
        new ObjectMapper().writeValue(res.getOutputStream(), tokens);

    }
}
