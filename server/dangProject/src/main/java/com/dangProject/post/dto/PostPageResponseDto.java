package com.dangProject.post.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PostPageResponseDto {
    private Long postId;
    private String title;
    private String personality;
    private String size;
    private String guName;
    private String imgUrl;


    @Builder
    public PostPageResponseDto(Long postId, String title, String personality, String size, String guName, String imgUrl) {
        this.postId = postId;
        this.title = title;
        this.personality = personality;
        this.size = size;
        this.guName = guName;
        this.imgUrl = imgUrl;
    }
}
