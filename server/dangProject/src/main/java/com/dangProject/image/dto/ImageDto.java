package com.dangProject.image.dto;

import com.dangProject.image.domain.Image;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ImageDto {
    private Long id;
    private String uniqueName;
    private String path;

    @Builder
    public ImageDto(String uniqueName, String path) {
        this.uniqueName = uniqueName;
        this.path = path;
    }

    public Image toEntity() {
        Image image = Image.builder()
                .uniqueName(uniqueName)
                .path(path)
                .build();
        return image;
    }
}
