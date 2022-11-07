package com.dangProject.comment.dto;

import com.dangProject.comment.domain.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentRequestDto {

    public Long postId;
    public String comment;

    public Comment toEntity() {
        return Comment.builder()
                .comment(comment)
                .build();
    }
}
