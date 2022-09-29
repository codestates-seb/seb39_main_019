package com.dangProject.image.service;

import com.dangProject.image.domain.Image;
import com.dangProject.image.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    public List<Image> saveImage(List<Image> imageList) throws IOException {
        for (Image image : imageList) {
            imageRepository.save(image);
        }

        return imageList;
    }

}
