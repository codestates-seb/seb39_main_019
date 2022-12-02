package com.dangProject.post.image.domain;

import com.dangProject.post.domain.Post;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Image {

    @Id
    @Column(name = "image_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column
    private String fileName;

    @Column
    private String s3Url;

    @Column
    private String s3FilePath;

    @Builder
    public Image(String fileName, String s3Url, String s3FilePath) {
        this.fileName = fileName;
        this.s3Url = s3Url;
        this.s3FilePath = s3FilePath;
    }

    public void updatePost(Post post) {
        this.post = post;
    }
}
