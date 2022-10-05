package com.dangProject.post.controller;

import com.dangProject.post.dto.PostRequestDto;
import com.dangProject.post.dto.PostResponseDto;
import com.dangProject.post.service.PostService;
import com.dangProject.commondto.MultipleResponseDto;
import com.dangProject.commondto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;


    @PostMapping
    public ResponseEntity savePost(@RequestBody PostRequestDto postRequestDto) {

        PostResponseDto response = postService.savePost(postRequestDto);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }


    @PatchMapping("/info/{id}")
    public ResponseEntity updateEntity(@PathVariable Long id,
                                       @RequestBody PostRequestDto postRequestDto){

        PostResponseDto response = postService.updatePost(id, postRequestDto);
        return new ResponseEntity(response, HttpStatus.OK);
    }


    @GetMapping("/info/{id}")
    public ResponseEntity findByIdPost(@PathVariable Long id) {

        PostResponseDto response = postService.findById(id);
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
//        return new ResponseEntity(response, HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity findAllPost(){

        List<PostResponseDto> response = postService.findAll();
        return new ResponseEntity(new MultipleResponseDto<>(response), HttpStatus.OK);
//        return new ResponseEntity(response, HttpStatus.OK);
    }


    @DeleteMapping("/info/{id}")
    public ResponseEntity deletePost(@PathVariable Long id) {

        postService.deletePost(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
