package com.dangProject.dog.controller;

import com.dangProject.dog.domain.Dog;
import com.dangProject.dog.dto.DogInfoPatchDto;
import com.dangProject.dog.dto.DogResponse;
import com.dangProject.dog.dto.DogValidationPostDto;
import com.dangProject.dog.mapper.DogMapper;
import com.dangProject.dog.service.DogService;
import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dogs")
public class DogController {

    private final DogService dogService;
    private final DogMapper mapper;

    @Value("${service-key}")
    String key;

    @Value("${data-url}")
    String dataUrl;

    @PostMapping("/validation")
    public ResponseEntity registerDogNum(@RequestBody DogValidationPostDto dogValidationPostDto) throws IOException, ParseException {

        StringBuilder urlBuilder = new StringBuilder(dataUrl);
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + key);
        urlBuilder.append("&" + URLEncoder.encode("dog_reg_no","UTF-8") + "=" + URLEncoder.encode(dogValidationPostDto.getDog_reg_no(), "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("owner_nm","UTF-8") + "=" + URLEncoder.encode(dogValidationPostDto.getOwner_nm(), "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*xml(기본값) 또는 json*/
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        System.out.println("Response code: " + conn.getResponseCode());

        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
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
//        // 세 번째 JSONObject
//        JSONObject item = (JSONObject) body.get("item"); //출력 OK

//        System.out.println(response);
//        System.out.println(body);
//        System.out.println(item);

        if (!body.isEmpty()) {
            dogService.registerRegNo(dogValidationPostDto);
        }
        if (body.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.DOG_INFO_NOT_VALID);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //견주 인증 후, 강아지 정보 등록
    @PatchMapping("/info/{id}")
    public ResponseEntity registerInfo(@PathVariable long id,
                                                    @Valid @RequestBody DogInfoPatchDto dogInfoPatchDto) {
        //회원 정보 받아오는 건 로그인 후 인증 구현하고 추가하기
        //현재 테이블에 저장된 강아지 정보 id 받아오기 (지금 상황은 테이블에 id, 등록번호만 존재)
        dogInfoPatchDto.setId(id);
        dogService.addDog(dogInfoPatchDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
