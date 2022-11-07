package com.dangProject.comment.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
public class CommentResponseDto {

    private Long id;
    private String nickname;
    private String content;
    private String date;

    @Builder
    public CommentResponseDto(Long id, String nickname, String content, LocalDateTime date) {
        this.id = id;
        this.nickname = nickname;
        this.content = content;
        this.date = date.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
    }
}

