package com.dangProject.post.dto;

import com.dangProject.post.domain.Post;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
public class PostResponseDto {

    private Long id;
    private String title;
    private String personality;
    private String size;
    private String guName;
    private String content;
    private int view;

    private String date;
    private List<String> imgUrl;

//    private List<Comment> commentList;

    public PostResponseDto(Post entity, List<String> savedImgUrlList) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.personality = entity.getPersonality().getValue();
        this.size = entity.getSize().getValue();
        this.guName = entity.getGuName();
        this.content = entity.getContent();
        this.view = entity.getView();
        this.date = entity.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
        this.imgUrl = savedImgUrlList;
    }

    public PostResponseDto(Post entity, LocalDateTime modifiedAt, List<String> savedImgUrlList) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.personality = entity.getPersonality().getValue();
        this.size = entity.getSize().getValue();
        this.guName = entity.getGuName();
        this.content = entity.getContent();
        this.view = entity.getView();
        this.date = modifiedAt.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
        this.imgUrl = savedImgUrlList;
    }
}
