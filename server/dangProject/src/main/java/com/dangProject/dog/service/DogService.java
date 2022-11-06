package com.dangProject.dog.service;

import com.dangProject.dog.domain.Dog;
import com.dangProject.dog.dto.DogInfoPatchDto;
import com.dangProject.dog.dto.DogResponse;
import com.dangProject.dog.dto.DogValidationPostDto;
import com.dangProject.dog.repository.DogRepository;
import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import com.dangProject.member.service.MemberService;
import lombok.RequiredArgsConstructor;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Optional;

//@Transactional
@Service
@RequiredArgsConstructor
public class DogService {

    @Value("${service-key}")
    String key;

    @Value("${data-url}")
    String dataUrl;

    private final DogRepository dogRepository;
    private final MemberService memberService;

    //견주 인증
    public Dog registerRegNo(DogValidationPostDto dogValidationPostDto) throws UnsupportedEncodingException {
        String regNo = dogValidationPostDto.getDog_reg_no();
        String owner = dogValidationPostDto.getOwner_nm();

        String decodeServiceKey = URLDecoder.decode(key, "UTF-8");

        String result = WebClient.create(dataUrl)
                .get()
                .uri("?serviceKey=" + decodeServiceKey + "&dog_reg_no=" + regNo + "&owner_nm=" + owner + "&_type=json")
                .retrieve()
                .bodyToMono(String.class)
                .block();
        JSONObject jsonObject = new JSONObject(result);
        JSONObject response = jsonObject.getJSONObject("response");
        JSONObject body = response.getJSONObject("body");
        Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!body.isEmpty()) {
            verifyDogRegNo(dogValidationPostDto.getDog_reg_no());
            return dogRepository.save(Dog.builder()
                    .dogRegNo(dogValidationPostDto.getDog_reg_no())
                    .member(memberService.verifyMember(memberId))
                    .build());
        } else throw new BusinessLogicException(ExceptionCode.DOG_INFO_NOT_VALID);
    }

    //강아지 정보 등록
    @Transactional
    public Dog addDog(DogInfoPatchDto dogInfoPatchDto) {

        Dog findDog = dogRepository.getById(dogInfoPatchDto.getId());

        Optional.ofNullable(dogInfoPatchDto.getDogNm())
                .ifPresent(findDog::setDogNm);
        Optional.ofNullable(dogInfoPatchDto.getBreed())
                .ifPresent(findDog::setBreed);
        Optional.ofNullable(dogInfoPatchDto.getSexNm())
                .ifPresent(findDog::setSexNm);
        Optional.of(dogInfoPatchDto.getAge())
                .ifPresent(findDog::setAge);

        return findDog;
    }

    //특정 강아지 정보 조회
    public DogResponse findDog(Long id) {
        return dogRepository.findById(id)
                .map(DogResponse::of)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.DOG_NOT_FOUND));
    }

    //강아지 정보 삭제
    public void delete(Long id) {
        dogRepository.deleteById(id);
    }

    //동물등록번호 중복검사
    public void verifyDogRegNo(String dog_reg_no) {
        if(dogRepository.existsByDogRegNo(dog_reg_no))
            throw new BusinessLogicException(ExceptionCode.DOG_REG_NO_EXISTS);
    }

    //강아지 아이디로 정보 조회
    public Dog verifyDogById(Long id) {
        return dogRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.DOG_NOT_FOUND));
    }
}
