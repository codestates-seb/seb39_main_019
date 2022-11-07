package com.dangProject.post.repository;

import com.dangProject.post.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAll(Pageable pageable);
    List<Post> findAllByMemberId(Long memberId);

    List<Post> findByMemberId(Long memberId);
//    Page<Post> findByMemberId(Long memberId, Pageable pageable);
}
