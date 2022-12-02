package com.dangProject.post.dto.request;

import com.dangProject.post.domain.Post;
import com.dangProject.post.option.Personality;
import com.dangProject.post.option.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class PostRequestDto{
    private String title;
    private Personality personality;
    private Size size;
    private String guName;
    private String content;
    private List<Long> imageId;


    @Builder
    public PostRequestDto(String title, Personality personality, Size size, String guName, String content, List<Long> imageId) {
        this.title = title;
        this.personality = personality;
        this.size = size;
        this.guName = guName;
        this.content = content;
        this.imageId = imageId;
    }


    public Post toEntity() {
        return Post.builder()
                .title(title)
                .personality(personality)
                .size(size)
                .guName(guName)
                .content(content)
                .status(Post.PostStatus.UNCOMPLETED)
                .build();
    }
}
