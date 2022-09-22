package com.dangProject.board.dto;

import com.dangProject.audit.BaseTime;
import com.dangProject.board.domain.Post;
import com.dangProject.board.option.Personality;
import com.dangProject.board.option.Size;
import lombok.Getter;

@Getter
public class PostResponseDto {
    private Long id;
    private String title;
    private Personality personality;
    private Size size;
    private String guName;
    private String content;

    public PostResponseDto(Post entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.personality = entity.getPersonality();
        this.size = entity.getSize();
        this.guName = entity.getGuName();
        this.content = entity.getContent();
    }
}
