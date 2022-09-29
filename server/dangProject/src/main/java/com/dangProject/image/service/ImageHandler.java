package com.dangProject.image.service;

import com.dangProject.image.domain.Image;
import com.dangProject.image.dto.ImageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ImageHandler {
    private final ImageService imageService;

    public List<Image> parseFileInfo(List<MultipartFile> multipartFiles) throws IOException {

        List<Image> imageList = new ArrayList<>();

        if (!CollectionUtils.isEmpty(multipartFiles)) {

            // 파일명 변경용 날짜
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
            String currentDate = simpleDateFormat.format(new Date());

            String absolutePath = new File("").getAbsolutePath() + File.separator;
            String path = "images" + File.separator + currentDate;
            File file = new File(path);

            if (!file.exists()) {
//                file.mkdirs();
                boolean wasSuccessful = file.mkdirs();
                if(!wasSuccessful)
                    System.out.println("file: was not successful");
            }
            // 다중 파일 처리 - 확장자 처리, 파일병 지정
            for (MultipartFile multipartFile : multipartFiles) {
                String originalFileExtension = "";
                String contentType = multipartFile.getContentType();

                if(!ObjectUtils.isEmpty(contentType)){
                    if(contentType.contains("image/jpg")) {originalFileExtension = ".jpg";}
                    if(contentType.contains("image/jpeg")) {originalFileExtension = ".jpeg";}
                    else if(contentType.contains("image/png")) {originalFileExtension = ".png";}
                    else if(contentType.contains("image/gif")) {originalFileExtension = ".gif";}
                }

                // 파일 이름 변경
                UUID uuid = UUID.randomUUID();
                String uniqueName = uuid + originalFileExtension;

                // 파일 DTO, Entity 생성
                ImageDto imageDto = ImageDto.builder()
                        .uniqueName(uniqueName)
                        .path(path + File.separator + uniqueName)
                        .build();

                Image image = imageDto.toEntity();

                // 리스트에 추가
                imageList.add(image);

                // 업로드한 파일 데이터를 지정 파일에 저장
                file = new File(absolutePath + path + File.separator + uniqueName);
                multipartFile.transferTo(file);

                // 파일권한 설정 _ 어디서 쓰는건지 모르겠음
                file.setWritable(true);
                file.setReadable(true);
            }
        }
        return imageList;
    }
}
