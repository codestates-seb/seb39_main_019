package com.dangProject.security.jwt;

import com.dangProject.member.domain.MemberRole;
import com.dangProject.member.repository.RefreshTokenRedisRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class JwtHelper {
    private static RefreshTokenRedisRepository redisRepository;
    private static final int ACCESS_TOKEN_VALIDITY = 15 * 60 * 1000; //15분
    private static final int REFRESH_TOKEN_VALIDITY = 60 * 60 * 1000; //1시간
    //24 * 60 * 60 * 1000; //하루

    private static final String secretKey = "puppyBuddy";

    public static String generateAccessToken(Long memberId, MemberRole role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", role.getAuthority());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(memberId.toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public static String generateRefreshToken(Long memberId) {
        return  Jwts.builder()
                .setSubject(memberId.toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public static boolean validateJwt(String token) throws RuntimeException {
        return Jwts.parser().setSigningKey(secretKey).isSigned(token);
    }

    public static <R> R getClaim(String token, Function<Claims, R> func) {
        Claims claims= Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        return func.apply(claims);
    }

    public static boolean validateAccessToken(String token) throws RuntimeException {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
            if (redisRepository.hasKeyBlackList(token)) {
                return false;
            }
            return true;
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
