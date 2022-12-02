package com.dangProject.dog.service;

import com.dangProject.dog.domain.Dog;
import com.dangProject.dog.dto.request.DogInfoRequestDto;
import com.dangProject.dog.dto.request.DogInfoUpdateDto;
import com.dangProject.dog.dto.response.DogInfoResponse;
import com.dangProject.dog.dto.response.DogResponse;
import com.dangProject.dog.dto.request.DogValidationRequestDto;
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
import java.time.LocalDate;
import java.util.Optional;

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
    @Transactional
    public Dog registerRegNo(DogValidationRequestDto dogValidationRequestDto) throws UnsupportedEncodingException {
        String regNo = dogValidationRequestDto.getDog_reg_no();
        String owner = dogValidationRequestDto.getOwner_nm();

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

        if (!body.isEmpty()) {
            verifyDogRegNo(dogValidationRequestDto.getDog_reg_no());
            return dogRepository.save(Dog.builder()
                    .dogRegNo(dogValidationRequestDto.getDog_reg_no())
                    .member(memberService.verifyMember(dogValidationRequestDto.getMemberId()))
                    .build());
        } else throw new BusinessLogicException(ExceptionCode.DOG_INFO_NOT_VALID);
    }

    //강아지 정보 등록
    @Transactional
    public Dog editDog(DogInfoRequestDto dogInfoRequestDto) {

        Dog findDog = dogRepository.getById(dogInfoRequestDto.getId());

        Optional.ofNullable(dogInfoRequestDto.getDogNm())
                .ifPresent(findDog::setDogNm);
        Optional.ofNullable(dogInfoRequestDto.getBreed())
                .ifPresent(findDog::setBreed);
        Optional.ofNullable(dogInfoRequestDto.getSexNm())
                .ifPresent(findDog::setSexNm);
        Optional.of((LocalDate.now().getYear() - dogInfoRequestDto.getAge() + 1))
                .ifPresent(findDog::setAge);

        return findDog;
    }

    //로그인 후 강아지 정보 수정
    @Transactional
    public Dog updateDog(DogInfoUpdateDto dogInfoUpdateDto) {

        Dog myDog = dogRepository.getById(dogInfoUpdateDto.getId());

        Optional.ofNullable(dogInfoUpdateDto.getDogNm())
                .ifPresent(myDog::setDogNm);
        Optional.ofNullable(dogInfoUpdateDto.getBreed())
                .ifPresent(myDog::setBreed);
        Optional.ofNullable(dogInfoUpdateDto.getSexNm())
                .ifPresent(myDog::setSexNm);
        Optional.of((LocalDate.now().getYear() - dogInfoUpdateDto.getAge() + 1))
                .ifPresent(myDog::setAge);

        return myDog;
    }

    //특정 강아지 정보 조회
    public DogInfoResponse findDog(Long id) {
        return dogRepository.findById(id)
                .map(DogInfoResponse::of)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.DOG_NOT_FOUND));
    }

    //강아지 정보 삭제
    public void delete(Long id) {
        dogRepository.deleteById(id);
    }

    //동물등록번호 중복검사
    public void verifyDogRegNo(String dog_reg_no) {
        Optional<Dog> dog = dogRepository.findByDogRegNo(dog_reg_no);
        if(dog.isPresent())
            throw new BusinessLogicException(ExceptionCode.DOG_REG_NO_EXISTS);
    }

    //강아지 아이디로 정보 조회
    public Dog verifyDogById(Long id) {
        return dogRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.DOG_NOT_FOUND));
    }
}
