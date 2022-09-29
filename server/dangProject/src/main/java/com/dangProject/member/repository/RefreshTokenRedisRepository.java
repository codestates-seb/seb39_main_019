package com.dangProject.member.repository;

import com.dangProject.security.jwt.JwtHelper;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private final RedisTemplate<String, String> redisBlackListTemplate;

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

    public void deleteValue(String key) {
        redisTemplate.delete(key);
    }

    public void setBlackList(String key, String value, Long milliSeconds) {
        redisBlackListTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(value.getClass()));
        redisBlackListTemplate.opsForValue().set(key, value, milliSeconds, TimeUnit.MILLISECONDS);
    }

    public boolean hasKeyBlackList(String key) {
        return redisBlackListTemplate.hasKey(key);
    }
}
