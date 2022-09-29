package com.dangProject.image.domain;

import com.dangProject.audit.BaseTime;
import com.dangProject.post.domain.Post;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column
    private String originalName;

    @Column
    private String uniqueName;

    @Column
    private String path;


    @Builder
    public Image(String originalName, String uniqueName, String path) {
        this.originalName = originalName;
        this.uniqueName = uniqueName;
        this.path = path;
    }
}
