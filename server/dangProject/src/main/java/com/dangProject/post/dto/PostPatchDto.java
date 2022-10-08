package com.dangProject.post.dto;

import com.dangProject.post.domain.Post;
import com.dangProject.post.option.Personality;
import com.dangProject.post.option.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostPatchDto {
    private String title;
    private Personality personality;
    private Size size;
    private String guName;
    private String content;

    @Builder
    public PostPatchDto(String title, Personality personality, Size size, String guName, String content) {
        this.title = title;
        this.personality = personality;
        this.size = size;
        this.guName = guName;
        this.content = content;
    }

    public Post toEntity() {
        return Post.builder()
                .title(title)
                .personality(personality)
                .size(size)
                .guName(guName)
                .content(content)
                .build();
    }
}
