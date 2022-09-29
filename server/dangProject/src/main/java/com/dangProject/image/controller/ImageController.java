package com.dangProject.image.controller;

import com.dangProject.image.domain.Image;
import com.dangProject.image.service.ImageHandler;
import com.dangProject.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/v1/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;
    private final ImageHandler imageHandler;

    @PostMapping
    public List<Image> uploadImage(@RequestPart(value = "image") List<MultipartFile> multipartFiles) throws IOException {
        List<Image> imageList = imageHandler.parseFileInfo(multipartFiles);
        imageService.saveImage(imageList);

        List<Image> responseList = imageService.saveImage(imageList);

        return responseList;
    }
}
