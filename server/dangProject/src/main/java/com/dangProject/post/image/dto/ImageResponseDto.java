package com.dangProject.post.image.dto;

import com.dangProject.post.image.domain.Image;
import lombok.Getter;

@Getter
public class ImageResponseDto {
    private Long imageId;
    private String s3Url;

    public ImageResponseDto(Image entity) {
        this.imageId = entity.getId();
        this.s3Url = entity.getS3Url();
    }
}
