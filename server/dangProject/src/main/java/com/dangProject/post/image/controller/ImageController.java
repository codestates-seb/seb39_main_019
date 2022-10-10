package com.dangProject.post.image.controller;

import com.dangProject.post.image.domain.Image;
import com.dangProject.post.image.dto.ImageResponseDto;
import com.dangProject.post.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/v1/images")
@RequiredArgsConstructor
public class ImageController {

    public final ImageService s3imgService;

    @PostMapping
    public ResponseEntity saveFile(@RequestPart(value = "files") List<MultipartFile> multipartFiles)throws IOException {

        List<ImageResponseDto> imageResponse = s3imgService.addFile(multipartFiles);
        return new ResponseEntity(imageResponse, HttpStatus.CREATED);
    }


    @GetMapping("{id}")
    public ResponseEntity findFile(@PathVariable Long id) {
        String url = s3imgService.findUrlById(id);
        return new ResponseEntity(url, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity removefile(@PathVariable Long id) {
        s3imgService.removeFile(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
