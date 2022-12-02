package com.dangProject.post.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import com.dangProject.post.domain.Post;
import com.dangProject.post.image.domain.Image;
import com.dangProject.post.image.dto.ImageResponseDto;
import com.dangProject.post.image.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final AmazonS3 amazonS3;
    private final ImageRepository imageRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    public List<ImageResponseDto> addFile(List<MultipartFile> multipartFiles) throws IOException {
        List<ImageResponseDto> imageResponseDtoList = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFiles) {
            ImageResponseDto imageResponseDto = saveFile(multipartFile);

            imageResponseDtoList.add(imageResponseDto);
        }
        return imageResponseDtoList;
    }

    public List<String> savePost(Post savedPost, List<Long> imageId) {
        List<String> savedImageUrlList = new ArrayList<>();

        for (Long id : imageId) {
            Image image = findById(id);
            image.updatePost(savedPost);
            imageRepository.save(image);
            savedImageUrlList.add(image.getS3Url());
        }
        return savedImageUrlList;
    }


    public Image findById(Long id) {
        return imageRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND));
    }


    public String findUrlById(Long id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Image1 does not exist"));

        return image.getS3Url();
    }


    public List<String> findUrlByPostId(Long id) {
        List<Image> imgList = imageRepository.findByPostId(id);
        List<String> postImageUrlList = imgList.stream().map(i -> i.getS3Url()).collect(Collectors.toList());

        return postImageUrlList;
    }

    public String findThmUrlByPostId(Long id) {
        if (imageRepository.findByPostId(id).size() != 0) {
            Image image = imageRepository.findByPostId(id).get(0);
            String preImage = image.getS3Url();
            return preImage;
        }
        return "존재하지 않는 게시글입니다.";
    }

    public void removeFile(Long id) {
        Image image = imageRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Image1 does not exist"));

        String bucketKey = image.getS3FilePath();
        amazonS3.deleteObject(bucket, bucketKey);
        imageRepository.delete(image);
    }

    public ImageResponseDto saveFile(MultipartFile multipartFile) throws IOException {

        // 파일 경로, 날짜이름으로 폴더 생성 - 준비
        String absolutePath = new File("").getAbsolutePath() + File.separator + "temp";
        String fileName = "";

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String currentDate = simpleDateFormat.format(new Date());
        String contentType = multipartFile.getContentType();

        if (ObjectUtils.isEmpty(contentType)) {
            throw new BusinessLogicException(ExceptionCode.FILE_TYPE_NOT_ACCEPTED);}
        else {
            if (!verifyContentType(contentType)) {
                throw new BusinessLogicException(ExceptionCode.FILE_TYPE_NOT_ACCEPTED);}
            else {
                fileName = UUID.randomUUID() + multipartFile.getOriginalFilename();

                // 로컬에 저장
                File file = new File(absolutePath + File.separator + fileName);
                if (!file.exists()) { file.mkdirs(); }
                multipartFile.transferTo(file);
                file.createNewFile();

                // S3 버킷에 저장
                String bucketKey = fileName;
                amazonS3.putObject(new PutObjectRequest(bucket, bucketKey, file).withCannedAcl(CannedAccessControlList.PublicRead));

                // Image 저장
                String s3url = amazonS3.getUrl(bucket, fileName).toString();

                Image img = Image.builder()
                        .fileName(fileName)
                        .s3Url(s3url)
                        .s3FilePath(bucketKey)
                        .build();

                imageRepository.save(img);
                ImageResponseDto imageResponseDto = new ImageResponseDto(img);
                file.delete();

                return imageResponseDto;

            }
        }
    }

    public boolean verifyContentType (String contentType) {
        if(contentType.contains("jpg") || contentType.contains("jpeg") || contentType.contains("png") || contentType.contains("gif")) {
            return true;
        } else { return false; }
    }
}