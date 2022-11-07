package com.dangProject.comment.repository;

import com.dangProject.comment.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    //    Page<Comment> findAll(Pageable pageable);
    List<Comment> findAllByPostId(Long postId);
}
