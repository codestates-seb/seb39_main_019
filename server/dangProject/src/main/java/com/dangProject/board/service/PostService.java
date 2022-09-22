package com.dangProject.board.service;

import com.dangProject.board.domain.Post;
import com.dangProject.board.dto.PostRequestDto;
import com.dangProject.board.dto.PostResponseDto;
import com.dangProject.board.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    // 1.dto로 입력된 값 다 보여주기

    @Transactional
    public PostResponseDto savePost(PostRequestDto postRequestDto) {
        Post entity = postRepository.save(postRequestDto.toEntity());
        return new PostResponseDto(entity);
    }

    @Transactional
    public PostResponseDto updatePost(Long id, PostRequestDto postRequestDto) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Post does not exist"));

        post.update(postRequestDto.getTitle(),
                    postRequestDto.getPersonality(),
                    postRequestDto.getSize(),
                    postRequestDto.getGuName(),
                    postRequestDto.getContent());

        return new PostResponseDto(post);
    }

    public PostResponseDto findById(Long id) {
        Post entity = postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Post does not exist"));
        return new PostResponseDto(entity);
    }

    public List<PostResponseDto> findAll() {
        return postRepository.findAll().stream()
                .map(post -> new PostResponseDto(post)).collect(Collectors.toList());
    }

    public void deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Post does not exist"));
        postRepository.delete(post);
    }
}
