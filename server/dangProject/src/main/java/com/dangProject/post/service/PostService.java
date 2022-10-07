package com.dangProject.post.service;

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
        Post post = postRepository.findById(id).orElseThrow(()-> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        post.update(id, patch);
        postRepository.save(post);
        List<String> imgUrlList = imageService.findUrlByPostId(id);
        return new PostResponseDto(post, imgUrlList);
    }


    public PostTotalResponseDto findById(Long id) {
        // 1. postId 로 post 정보 가지고오기
        // 2. post에서 회원정보, 회원강아지 정보 가지고오기
        // 3. post에 저장된 이미지 url 리스트 가지고 오기
        Post post = postRepository.findById(id).get();  // 1

        // 특정 강아지 정보를 조회할 수 있어야함. 그러려면 member에서 등록된 강아지를 리스트로 받는게 아니라 특정 강아지 정보를 받아야함
        List<Dog> dogList = post.getMember().getDogList();
        if(dogList.size() != 0){
            Dog dog = dogList.get(0);
            Long memberId = post.getMember().getId();

            List<String> imgUrlList = imageService.findUrlByPostId(post.getId());

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
                    .imgUrlList(imgUrlList)
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
        Post post = postRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Post does not exist"));
        postRepository.delete(post);
    }


    public Post verifyPost(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }
}
