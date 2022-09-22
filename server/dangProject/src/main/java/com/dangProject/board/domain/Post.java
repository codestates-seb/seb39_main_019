package com.dangProject.board.domain;

import com.dangProject.audit.BaseTime;
import com.dangProject.board.option.Personality;
import com.dangProject.board.option.Size;
import com.dangProject.file.File;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Personality personality;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Size size;

    @Column(nullable = false)
//    @Enumerated(EnumType.STRING)
    private String guName;

    @Column(nullable = false)
    private String content;

//    @OneToMany(mappedBy = "post")
//    private List<File> files;

    @Builder
    public Post(String title, Personality personality, Size size, String guName, String content) {
        this.title = title;
        this.personality = personality;
        this.size = size;
        this.guName = guName;
        this.content = content;
    }

    public void update(String title, Personality personality, Size size, String guName, String content) {
        this.title = title;
        this.personality = personality;
        this.size = size;
        this.guName = guName;
        this.content = content;
    }
}
