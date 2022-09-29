package com.dangProject.security.handler;

import com.dangProject.security.exception.CustomAuthenticationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        CustomAuthenticationException exception = (CustomAuthenticationException) authException;
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        //try - with - resource -> JAVA 8
        try (OutputStream os = response.getOutputStream()) {
            new ObjectMapper().writeValue(os, exception.getMessage());
            os.flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
