package com.dangProject.dog.service;

import com.dangProject.dog.domain.Dog;
import com.dangProject.dog.dto.DogInfoPatchDto;
import com.dangProject.dog.dto.DogResponse;
import com.dangProject.dog.dto.DogValidationPostDto;
import com.dangProject.dog.repository.DogRepository;
import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import com.dangProject.member.domain.Member;
import com.dangProject.member.domain.MemberRole;
import com.dangProject.member.domain.MemberType;
import com.dangProject.member.repository.MemberRepository;
import com.dangProject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
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
    public Dog registerRegNo(DogValidationPostDto dogValidationPostDto) throws IOException, ParseException {

        StringBuilder urlBuilder = new StringBuilder(dataUrl);
        urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + key);
        urlBuilder.append("&" + URLEncoder.encode("dog_reg_no", "UTF-8") + "=" + URLEncoder.encode(dogValidationPostDto.getDog_reg_no(), "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("owner_nm", "UTF-8") + "=" + URLEncoder.encode(dogValidationPostDto.getOwner_nm(), "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*xml(기본값) 또는 json*/
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        System.out.println("Response code: " + conn.getResponseCode());

        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        String jsonData = sb.toString();

        // JSONParser로 JSONObject 객체
        JSONObject objData = (JSONObject) new JSONParser().parse(jsonData);
        // 첫 번째 JSONObject
        JSONObject response = (JSONObject) objData.get("response"); //출력 OK
        // 두 번째 JSONObject
        JSONObject body = (JSONObject) response.get("body"); //출력 OK

        if (!body.isEmpty()) {
            Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            verifyDogRegNo(dogValidationPostDto.getDog_reg_no());
            return dogRepository.save(Dog.builder()
                    .dogRegNo(dogValidationPostDto.getDog_reg_no())
                    .member(memberService.verifyMember(memberId))
                    .build());
        }
        if (body.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.DOG_INFO_NOT_VALID);
        }
        return null;
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
