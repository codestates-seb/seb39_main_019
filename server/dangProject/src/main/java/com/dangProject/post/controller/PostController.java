package com.dangProject.post.controller;

import com.dangProject.post.dto.*;
import com.dangProject.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    // 게시글 등록
    @PreAuthorize("hasAuthority('CERTIFIED')")
    @PostMapping("/v1/posts")
    public ResponseEntity<PostResponseDto> savePost(@RequestBody PostRequestDto postRequestDto) {
        return ResponseEntity.ok(postService.savePost(postRequestDto));
    }

    // 게시글 수정
    @PatchMapping("/v1/posts/{id}")
    public ResponseEntity<PostResponseDto> updatePost(@RequestBody PostPatchDto postPatchDto, @PathVariable Long id) {
        return ResponseEntity.ok(postService.patchPost(postPatchDto, id));
    }

    // 게시글 상세조회
    //견주 인증 한 회원 권한은 CERTIFIED
    //견주 인증 하지 않은 회원 권한은 UNCERTIFIED
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
    public ResponseEntity deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return new ResponseEntity("게시글 삭제 완료.",HttpStatus.NO_CONTENT);
    }
}
