package com.dangProject.post.service;

import com.dangProject.comment.domain.Comment;
import com.dangProject.comment.dto.CommentResponseDto;
import com.dangProject.comment.repository.CommentRepository;
import com.dangProject.dog.domain.Dog;
import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import com.dangProject.likes.repository.LikesRepository;
import com.dangProject.member.domain.Member;
import com.dangProject.member.repository.MemberRepository;
import com.dangProject.post.domain.Post;
import com.dangProject.post.dto.request.PostRequestDto;
import com.dangProject.post.dto.request.PostUpdateDto;
import com.dangProject.post.dto.response.PostPageResponseDto;
import com.dangProject.post.dto.response.PostResponseDto;
import com.dangProject.post.dto.response.PostTotalResponseDto;
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
    private final LikesRepository likesRepository;


    public PostResponseDto savePost(PostRequestDto postRequestDto) {

        Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = memberRepository.findById(memberId).get();
        Post newPost = postRequestDto.toEntity();
        newPost.saveMember(member);

        Post savedPost = postRepository.save(newPost);
        List<Long> imageId = postRequestDto.getImageId();
        List<String> savedImgUrlList = imageService.savePost(savedPost, imageId);

        return new PostResponseDto(savedPost, savedImgUrlList);
    }

    // 모집 상태 변경
    public PostResponseDto updatePostStatus(Long id) {
        Post post = postRepository.findById(id).get();
        Post.PostStatus status = post.getStatus();

        if (status.equals(Post.PostStatus.UNCOMPLETED)){
            post.updateStatus(Post.PostStatus.COMPLETED);
        } else {
            post.updateStatus(Post.PostStatus.UNCOMPLETED);
        }

        Post savedPost = postRepository.save(post);
        List<String> imgUrlList = imageService.findUrlByPostId(id);

        return new PostResponseDto(savedPost, imgUrlList);
    }


    public PostResponseDto patchPost(PostUpdateDto patch, Long id) {
        Post post = postRepository.findById(id).orElseThrow(()-> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
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

        // 특정 강아지 정보를 조회
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
                    .status(post.getStatus())
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
                        .status(m.getStatus().getStatus())
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
                    .status(post.getStatus().getStatus())
                    .imgUrl(imageService.findThmUrlByPostId(post.getId()))
                    .build());
        }
        return postDtoList;
    }


    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        postRepository.delete(post);
    }


    public Post verifyPost(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }


    //로그인한 사용자가 작성한 게시글 조회
    public List<PostPageResponseDto> findMyPost(Long memberId) {

        List<PostPageResponseDto> postDtoList = new ArrayList<>();
        List<Post> postList = postRepository.findByMemberId(memberId);

        for (Post post : postList) {
            postDtoList.add(
                    PostPageResponseDto.builder()
                            .postId(post.getId())
                            .title(post.getTitle())
                            .personality(post.getPersonality().getValue())
                            .size(post.getSize().getValue())
                            .guName(post.getGuName())
                            .status(post.getStatus().getStatus())
                            .imgUrl(imageService.findThmUrlByPostId(post.getId()))
                            .build());
        }

        return postDtoList;
    }
}
