package com.dangProject.post.controller;

import com.dangProject.likes.service.LikesService;
import com.dangProject.post.dto.request.PostRequestDto;
import com.dangProject.post.dto.request.PostUpdateDto;
import com.dangProject.post.dto.response.PostPageResponseDto;
import com.dangProject.post.dto.response.PostResponseDto;
import com.dangProject.post.dto.response.PostTotalResponseDto;
import com.dangProject.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final LikesService likesService;

    // 게시글 등록
    //견주 인증 한 회원 권한은 CERTIFIED
    //견주 인증 하지 않은 회원 권한은 UNCERTIFIED
    @PreAuthorize("hasAuthority('CERTIFIED')")
    @PostMapping("/v1/posts")
    public ResponseEntity<PostResponseDto> savePost(@RequestBody PostRequestDto postRequestDto) {
        return ResponseEntity.ok(postService.savePost(postRequestDto));
    }

    // 모집상태 변경
    @PatchMapping("v1/posts/status/{id}")
    @PreAuthorize("hasAuthority('CERTIFIED')")
    public ResponseEntity<PostResponseDto> updatePostStatus(@PathVariable Long id) {
        return ResponseEntity.ok(postService.updatePostStatus(id));
    }

    // 좋아요 클릭
    @PatchMapping("v1/like/{id}")
    @PreAuthorize("hasAuthority('CERTIFIED')")
    public ResponseEntity<Integer> updateLikes(@PathVariable Long id){
        Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(likesService.updateLikes(id, memberId));
    }

    // 게시글 수정
    @PatchMapping("/v1/posts/{id}")
    @PreAuthorize("hasAuthority('CERTIFIED')")
    public ResponseEntity<PostResponseDto> updatePost(@RequestBody PostUpdateDto postUpdateDto, @PathVariable Long id) {
        return ResponseEntity.ok(postService.patchPost(postUpdateDto, id));
    }

    // 게시글 상세조회
    @PreAuthorize("hasAuthority('CERTIFIED')")
    @GetMapping({"/v1/posts/{id}"})
    public ResponseEntity<PostTotalResponseDto> findPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.findById(id));
    }

    // 게시글 리스트 조회
    @GetMapping("/list/posts")
    public ResponseEntity<List<PostPageResponseDto>> findPostNoPage() {
        return ResponseEntity.ok(postService.findAllNoPage());
    }

    // 게시글 삭제
    @DeleteMapping({"/v1/posts/{id}"})
    @PreAuthorize("hasAuthority('CERTIFIED')")
    public ResponseEntity deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return new ResponseEntity("게시글 삭제 완료.",HttpStatus.OK);
    }

    @GetMapping("/v1/posts/me")
    @PreAuthorize("hasAuthority('CERTIFIED')")
    public ResponseEntity<List<PostPageResponseDto>> getMyPosts() {
        Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(postService.findMyPost(id));
    }
}
