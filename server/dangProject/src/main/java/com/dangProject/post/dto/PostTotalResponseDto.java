package com.dangProject.post.dto;

import com.dangProject.comment.dto.CommentResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
public class PostTotalResponseDto {
    private Long id;
    private Long memberId;
    private String nickname;
    private String dogNm;
    private String breed;
    private String sexNm;
    private int age;

    private String title;
    private String personality;
    private String size;
    private String guName;
    private String content;

    private int view;

    private String date;

    private List<String> imgUrlList;

    private List<CommentResponseDto> commentList;


    @Builder
    public PostTotalResponseDto(Long id, Long memberId, String nickname, String dogNm, String breed, String sexNm, int age, String title, String personality, String size, String guName, String content, int view, LocalDateTime date, List<String> imgUrlList, List<CommentResponseDto> commentList) {
        this.id = id;
        this.memberId = memberId;
        this.nickname = nickname;
        this.dogNm = dogNm;
        this.breed = breed;
        this.sexNm = sexNm;
        this.age = age;
        this.title = title;
        this.personality = personality;
        this.size = size;
        this.guName = guName;
        this.content = content;
        this.view = view;
        this.date = date.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
        this.imgUrlList = imgUrlList;
        this.commentList = commentList;
    }
}
