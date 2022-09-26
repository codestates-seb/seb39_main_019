package com.dangProject.member.repository;

import com.dangProject.security.jwt.JwtHelper;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public void save(Long memberId, String refreshToken) {

        redisTemplate.opsForValue().set(
                memberId.toString(),
                refreshToken,
                JwtHelper.getClaim(refreshToken, Claims::getExpiration).getTime(),
                TimeUnit.MILLISECONDS);
    }

    public String findBy(Long memberId) {
        return redisTemplate.opsForValue().get(memberId.toString());
    }
}
