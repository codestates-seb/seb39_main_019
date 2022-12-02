package com.dangProject.comment.controller;

import com.dangProject.comment.dto.CommentRequestDto;
import com.dangProject.comment.dto.CommentResponseDto;
import com.dangProject.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/api/comments")
    public ResponseEntity<CommentResponseDto> saveComment(@RequestBody CommentRequestDto commentRequestDto) {
        Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ResponseEntity.ok(commentService.saveComment(commentRequestDto, memberId));
    }

    @PatchMapping("/api/comments/{id}")
    public ResponseEntity<CommentResponseDto> updateComment(@RequestBody CommentRequestDto commentRequestDto, @PathVariable Long id) {
        return ResponseEntity.ok(commentService.patchComment(commentRequestDto, id));
    }

    @DeleteMapping("/api/comments/{id}")
    public ResponseEntity deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return new ResponseEntity("댓글 삭제 완료", HttpStatus.OK);
    }
}
