package com.dangProject.comment.dto;

import com.dangProject.comment.domain.Comment;
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

    public CommentResponseDto(Comment comment) {
        this.id = comment.getId();
        this.nickname = comment.getMember().getNickname();
        this.content = comment.getContent();
        this.date = comment.getModifiedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
    }
}

