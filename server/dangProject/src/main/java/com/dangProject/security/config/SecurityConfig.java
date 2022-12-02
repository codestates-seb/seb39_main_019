package com.dangProject.security.config;

import com.dangProject.security.handler.CustomAccessDeniedHandler;
import com.dangProject.security.handler.CustomAuthenticationEntryPoint;
import com.dangProject.security.jwt.JwtAuthenticationFilter;
import com.dangProject.security.jwt.JwtAuthenticationProvider;
import com.dangProject.security.login.LoginAuthenticationFilter;
import com.dangProject.security.login.LoginAuthenticationProvider;
import com.dangProject.security.oauth.CustomOauth2UserService;
import com.dangProject.security.oauth.OAuth2MemberSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.authentication.AuthenticationEntryPointFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.List;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final List<String> JWT_PATHS = List.of("/api/**", "/v1/**");
    private final LoginAuthenticationProvider loginAuthenticationProvider;
    private final JwtAuthenticationProvider jwtAuthenticationProvider;
    private final CustomAuthenticationEntryPoint authenticationEntryPoint;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final CustomOauth2UserService oauth2UserService;
    private final OAuth2MemberSuccessHandler oAuth2SuccessHandler;
    private final ClientRegistrationRepository clientRegistrationRepository;

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    public LoginAuthenticationFilter loginFiler() throws Exception {
        LoginAuthenticationFilter loginFilter = new LoginAuthenticationFilter("/auth/login");
        loginFilter.setAuthenticationManager(super.authenticationManager());
        loginFilter.setAuthenticationFailureHandler(new AuthenticationEntryPointFailureHandler(authenticationEntryPoint));
        return loginFilter;
    }

    public JwtAuthenticationFilter jwtFilter() throws Exception {
        OrRequestMatcher matcher = new OrRequestMatcher(JWT_PATHS.stream()
                .map(AntPathRequestMatcher::new)
                .collect(Collectors.toList()));
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(matcher);
        jwtAuthenticationFilter.setAuthenticationManager(super.authenticationManager());
        jwtAuthenticationFilter.setAuthenticationFailureHandler(new AuthenticationEntryPointFailureHandler(authenticationEntryPoint));
        return jwtAuthenticationFilter;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(loginAuthenticationProvider);
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .formLogin().disable()
                .csrf().disable()
                .headers().frameOptions().disable()

                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler)

                .and()
                .addFilterBefore(loginFiler(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class)

                .oauth2Login()
                .redirectionEndpoint().baseUri("/oauth2/login/callback/*")
                .and()
                .userInfoEndpoint().userService(oauth2UserService)
                .and().successHandler(oAuth2SuccessHandler)
                .and()
                .cors();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.setAllowCredentials(true);
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("*");
        configuration.setMaxAge(3000L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
