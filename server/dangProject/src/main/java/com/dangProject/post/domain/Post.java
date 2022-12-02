package com.dangProject.post.domain;

import com.dangProject.audit.BaseTime;
import com.dangProject.comment.domain.Comment;
import com.dangProject.likes.domain.Likes;
import com.dangProject.post.image.domain.Image;
import com.dangProject.member.domain.Member;
import com.dangProject.post.dto.request.PostUpdateDto;
import com.dangProject.post.option.Personality;
import com.dangProject.post.option.Size;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
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
    private String guName;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int view;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private PostStatus status;

    @JsonManagedReference
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Image> imageList = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Likes> likesList = new ArrayList<Likes>();

    public enum PostStatus{
        COMPLETED("모집완료"),
        UNCOMPLETED("모집중");

        @Getter
        private String status;

        PostStatus(String status) {
            this.status = status;
        }
    }

    @Builder
    public Post(String title, Personality personality, Size size, String guName, String content, PostStatus status) {
        this.title = title;
        this.personality = personality;
        this.size = size;
        this.guName = guName;
        this.content = content;
        this.status = status;
    }

    public void update(Long id, PostUpdateDto patch) {
        this.id = id;
        this.title = patch.getTitle();
        this.personality = patch.getPersonality();
        this.size = patch.getSize();
        this.guName = patch.getGuName();
        this.content = patch.getContent();
    }

    public void updateView(int viewCount) {
        this.view = viewCount;
    }

    public void saveMember(Member member) {
        this.member = member;
    }

    public void updateStatus(PostStatus status) {
        this.status = status;
    }
}
