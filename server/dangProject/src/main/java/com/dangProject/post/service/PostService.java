package com.dangProject.post.service;

import com.dangProject.comment.domain.Comment;
import com.dangProject.comment.dto.CommentResponseDto;
import com.dangProject.comment.repository.CommentRepository;
import com.dangProject.dog.domain.Dog;
import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import com.dangProject.member.domain.Member;
import com.dangProject.member.repository.MemberRepository;
import com.dangProject.post.domain.Post;
import com.dangProject.post.dto.*;
import com.dangProject.post.image.service.ImageService;
import com.dangProject.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final ImageService imageService;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    public PostResponseDto savePost(PostRequestDto postRequestDto) {
        // 로그인한 사용자 id Post에 저장 -> Post 저장 -> postId Image에 저장
        Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = memberRepository.findById(memberId).get();
        Post newPost = postRequestDto.toEntity();
        newPost.saveMember(member);

        Post savedPost = postRepository.save(newPost);
        List<Long> imageId = postRequestDto.getImageId();
        List<String> savedImgUrlList = imageService.savePost(savedPost, imageId);

        return new PostResponseDto(savedPost, savedImgUrlList);
    }

    // patchDto 사용
    public PostResponseDto patchPost(PostPatchDto patch, Long id) {
        Post post = postRepository.findById(id).orElseThrow(()-> new BusinessLogicException(ExceptionCode.POST_NOT_CHANGE));
        post.update(id, patch);
        postRepository.save(post);
        List<String> imgUrlList = imageService.findUrlByPostId(id);
        return new PostResponseDto(post, post.getModifiedAt(), imgUrlList);
    }


    public PostTotalResponseDto findById(Long id) {

        Post postBeforeCount = postRepository.findById(id).get();

        int viewCount = postBeforeCount.getView() + 1;
        postBeforeCount.updateView(viewCount);
        postRepository.save(postBeforeCount);

        Post post = postRepository.findById(id).get();
        List<Dog> dogList = post.getMember().getDogList();

        if(dogList.size() != 0){
            Dog dog = dogList.get(0);
            Long memberId = post.getMember().getId();

            List<String> imgUrlList = imageService.findUrlByPostId(id);
            List<Comment> commentList = commentRepository.findAllByPostId(id);
            List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
            for (Comment comment : commentList) {
                commentResponseDtoList.add(
                        CommentResponseDto.builder()
                                .id(comment.getId())
                                .nickname(comment.getMember().getNickname())
                                .content(comment.getContent())
                                .date(comment.getCreatedAt())
                                .build());
            }

            PostTotalResponseDto response = PostTotalResponseDto.builder()
                    .id(post.getId())
                    .memberId(memberId)
                    .nickname(post.getMember().getNickname())
                    .dogNm(dog.getDogNm())
                    .breed(dog.getBreed())
                    .sexNm(dog.getSexNm())
                    .age(dog.getAge())
                    .title(post.getTitle())
                    .personality(post.getPersonality().getValue())
                    .size(post.getSize().getValue())
                    .guName(post.getGuName())
                    .content(post.getContent())
                    .view(post.getView())
                    .date(post.getCreatedAt())
                    .imgUrlList(imgUrlList)
                    .commentList(commentResponseDtoList)
                    .build();

            return response;
        }
        return null;
    }


    public List<PostPageResponseDto> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Post> postList = postRepository.findAll(pageable);
        Page<PostPageResponseDto> postDtoList = postList.map(m ->
                PostPageResponseDto.builder()
                        .postId(m.getId())
                        .title(m.getTitle())
                        .personality(m.getPersonality().getValue())
                        .size(m.getSize().getValue())
                        .guName(m.getGuName())
                        .imgUrl(imageService.findThmUrlByPostId(m.getId()))
                        .build()
        );
        return  postDtoList.getContent();
    }


    public List<PostPageResponseDto> findAllNoPage() {
        List<Post> postList = postRepository.findAll();
        List<PostPageResponseDto> postDtoList = new ArrayList<>();
        for (Post post : postList) {
            postDtoList.add(PostPageResponseDto.builder()
                    .postId(post.getId())
                    .title(post.getTitle())
                    .personality(post.getPersonality().getValue())
                    .size(post.getSize().getValue())
                    .guName(post.getGuName())
                    .imgUrl(imageService.findThmUrlByPostId(post.getId()))
                    .build());
        }
        return postDtoList;
    }


    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post does not exist"));
        postRepository.delete(post);
    }


    public Post verifyPost(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }

    // 로그인한 사용자가 작성한 게시글 조회2
    public List<PostPageResponseDto> getMyPosts(Long id) {
        List<PostPageResponseDto> postDtoList = new ArrayList<>();
        List<Post> postList = postRepository.findAllByMemberId(id);

        for (Post post : postList) {
            postDtoList.add(
                    PostPageResponseDto.builder()
                            .postId(post.getId())
                            .title(post.getTitle())
                            .personality(post.getPersonality().getValue())
                            .size(post.getSize().getValue())
                            .guName(post.getGuName())
                            .imgUrl(imageService.findThmUrlByPostId(post.getId()))
                            .build());
        }
        return postDtoList;
    }
}
