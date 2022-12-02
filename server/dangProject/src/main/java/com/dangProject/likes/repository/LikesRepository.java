package com.dangProject.likes.repository;

import com.dangProject.likes.domain.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

    Optional<Likes> findByPost_IdAndMember_Id(Long postID, Long memberId);
}
