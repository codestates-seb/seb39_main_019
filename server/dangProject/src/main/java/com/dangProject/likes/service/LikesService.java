package com.dangProject.likes.service;

import com.dangProject.likes.domain.Likes;
import com.dangProject.likes.repository.LikesRepository;
import com.dangProject.member.domain.Member;
import com.dangProject.member.repository.MemberRepository;
import com.dangProject.post.domain.Post;
import com.dangProject.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikesService {

    private final LikesRepository likesRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    public int updateLikes(Long postId, Long memberId) {
        // 조회해보고 없으면 새로 저장후 1 반환, 있으면 삭제하고 0 반환
        Optional<Likes> likeStatus =  likesRepository.findByPost_IdAndMember_Id(postId, memberId);

        if(likeStatus.isEmpty()){
            Post post = postRepository.findById(postId).get();
            Member member = memberRepository.findById(memberId).get();
            Likes newLike = Likes.builder()
                    .post(post)
                    .member(member)
                    .build();
            likesRepository.save(newLike);

            return 1;
        } else {
            likesRepository.delete(likeStatus.get());
            return 0;
        }
    }
}
