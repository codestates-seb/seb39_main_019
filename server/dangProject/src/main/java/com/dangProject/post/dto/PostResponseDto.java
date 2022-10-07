package com.dangProject.post.dto;

import com.dangProject.post.domain.Post;
import lombok.Getter;

import java.util.List;

@Getter
public class PostResponseDto {
    private Long id;
    private String title;
    private String personality;
    private String size;
    private String guName;
    private String content;

    private List<String> imgUrl;

    public PostResponseDto(Post entity, List<String> savedImgUrlList) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.personality = entity.getPersonality().getValue();
        this.size = entity.getSize().getValue();
        this.guName = entity.getGuName();
        this.content = entity.getContent();
        this.imgUrl = savedImgUrlList;
    }

    public PostResponseDto(Post entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.personality = entity.getPersonality().getValue();
        this.size = entity.getSize().getValue();
        this.guName = entity.getGuName();
        this.content = entity.getContent();
    }
}
