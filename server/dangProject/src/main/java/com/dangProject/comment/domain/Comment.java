package com.dangProject.comment.domain;

import com.dangProject.member.domain.Member;
import com.dangProject.post.domain.Post;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.dangProject.audit.BaseTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment extends BaseTime {

    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "post_id")
    private Post post;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    private String content;

    @Builder
    public Comment(String comment) {
        this.content = comment;
    }

    public void savePost(Post post) {
        this.post = post;
    }

    public void saveMember(Member member) {
        this.member = member;
    }

    public void update(Long id, String comment) {
        this.id = id;
        this.content = comment;
    }
}
