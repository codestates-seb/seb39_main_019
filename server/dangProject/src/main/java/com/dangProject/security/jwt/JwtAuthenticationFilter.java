package com.dangProject.security.jwt;

import com.dangProject.security.exception.CustomAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private static final String HEADER_PREFIX = "Bearer ";

    public JwtAuthenticationFilter(RequestMatcher requestMatcher) {
        super(requestMatcher);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String accessToken = request.getHeader("Authorization");
        if (accessToken == null) {
            throw new CustomAuthenticationException("Authorization Header was not found");
        }

        String accessTokenContent = accessToken.substring(HEADER_PREFIX.length());
        JwtAuthenticationToken beforeToken = JwtAuthenticationToken.beforeOf(accessTokenContent);
        return super.getAuthenticationManager().authenticate(beforeToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        JwtAuthenticationToken afterToken = (JwtAuthenticationToken) authResult;

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(afterToken);
        SecurityContextHolder.setContext(context);

        chain.doFilter(request, response);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        SecurityContextHolder.clearContext();
        super.getFailureHandler().onAuthenticationFailure(request, response, failed);
    }
}
