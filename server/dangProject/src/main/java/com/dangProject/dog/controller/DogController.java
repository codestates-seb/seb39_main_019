package com.dangProject.dog.controller;

import com.dangProject.dog.dto.DogInfoPatchDto;
import com.dangProject.dog.dto.DogResponse;
import com.dangProject.dog.dto.DogValidationPostDto;
import com.dangProject.dog.mapper.DogMapper;
import com.dangProject.dog.service.DogService;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/dogs")
public class DogController {

    private final DogService dogService;
    private final DogMapper mapper;

    @PostMapping("/validation")
    public ResponseEntity registerDogNum(@RequestBody DogValidationPostDto dogValidationPostDto) throws IOException, ParseException {
        dogService.registerRegNo(dogValidationPostDto);
        return new ResponseEntity<>("견주 인증이 완료되었습니다.", HttpStatus.OK);
    }

    //견주 인증 후, 강아지 정보 등록
    @PatchMapping("/info/{id}")
    public ResponseEntity registerInfo(@PathVariable long id,
                                       @Valid @RequestBody DogInfoPatchDto dogInfoPatchDto) {
        dogInfoPatchDto.setId(id);
        dogService.addDog(dogInfoPatchDto);
        return new ResponseEntity<>("강아지 정보 등록이 완료되었습니다.", HttpStatus.OK);
    }

    //강아지 정보 삭제
    @DeleteMapping("/info/{id}")
    public ResponseEntity deleteInfo(@PathVariable Long id) {
        dogService.delete(id);
        return new ResponseEntity<>("강아지 정보가 삭제되었습니다.", HttpStatus.NO_CONTENT);
    }

    //특정 강아지 정보 조회
    @GetMapping("/info/{id}")
    public ResponseEntity<DogResponse> getDog(@PathVariable Long id) {
        return new ResponseEntity<>(dogService.findDog(id), HttpStatus.OK);
    }
}
