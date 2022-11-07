package com.dangProject.comment.service;

import com.dangProject.comment.domain.Comment;
import com.dangProject.comment.dto.CommentRequestDto;
import com.dangProject.comment.dto.CommentResponseDto;
import com.dangProject.comment.repository.CommentRepository;
import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import com.dangProject.member.domain.Member;
import com.dangProject.member.repository.MemberRepository;
import com.dangProject.post.domain.Post;
import com.dangProject.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    public CommentResponseDto saveComment(CommentRequestDto commentRequestDto, Long memberId) {
        // post, member, 댓글 내용 repository에 저장
        Post post = postRepository.findById(commentRequestDto.postId).get();
        Member member = memberRepository.findById(memberId).get();

        Comment comment = commentRequestDto.toEntity();
        comment.saveMember(member);
        comment.savePost(post);

        Comment savedComment = commentRepository.save(comment);

        CommentResponseDto response = CommentResponseDto.builder()
                .id(savedComment.getId())
                .nickname(savedComment.getMember().getNickname())
                .content(savedComment.getContent())
                .date(savedComment.getCreatedAt())
                .build();

        return response;
    }

    public CommentResponseDto patchComment(CommentRequestDto commentRequestDto, Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        comment.update(id, commentRequestDto.getComment());
        commentRepository.save(comment);

        Comment savedComment = commentRepository.findById(id).get();

        CommentResponseDto response = CommentResponseDto.builder()
                .id(id)
                .nickname(savedComment.getMember().getNickname())
                .content(savedComment.getContent())
                .date(savedComment.getModifiedAt())
                .build();

        return response;
    }

    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        commentRepository.delete(comment);
    }
}
