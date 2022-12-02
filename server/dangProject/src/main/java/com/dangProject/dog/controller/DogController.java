package com.dangProject.dog.controller;

import com.dangProject.dog.dto.request.DogInfoRequestDto;
import com.dangProject.dog.dto.request.DogInfoUpdateDto;
import com.dangProject.dog.dto.response.DogInfoResponse;
import com.dangProject.dog.dto.request.DogValidationRequestDto;
import com.dangProject.dog.service.DogService;
import com.dangProject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
@RequestMapping
public class DogController {

    private final DogService dogService;
    private final MemberService memberService;

    //견주 인증
    @PostMapping("/dogs/validation")
    public ResponseEntity register(@Valid @RequestBody DogValidationRequestDto dogValidationRequestDto) throws IOException {
        dogService.registerRegNo(dogValidationRequestDto);
        return new ResponseEntity<>("견주 인증이 완료되었습니다.", HttpStatus.OK);
    }

    //견주 인증 후, 강아지 정보 등록
    @PatchMapping("/dogs/info/{id}")
    public ResponseEntity update(@PathVariable long id,
                                 @Valid @RequestBody DogInfoRequestDto dogInfoRequestDto) {
        dogInfoRequestDto.setId(id);
        dogService.editDog(dogInfoRequestDto);
        memberService.certificate(dogInfoRequestDto.getMemberId());
        return new ResponseEntity<>(dogService.findDog(id), HttpStatus.OK);
    }

    //마이페이지에서 강아지 정보 수정
    @PatchMapping("/v1/dogs/info/{id}")
    public ResponseEntity updateInfo(@PathVariable long id,
                                     @Valid @RequestBody DogInfoUpdateDto dogInfoUpdateDto) {
        dogInfoUpdateDto.setId(id);
        dogService.updateDog(dogInfoUpdateDto);
        return new ResponseEntity<>(dogService.findDog(id), HttpStatus.OK);
    }

    //강아지 정보 삭제
    @DeleteMapping("/v1/dogs/info/{id}")
    public ResponseEntity deleteInfo(@PathVariable Long id) {
        //Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        dogService.delete(id);
        return new ResponseEntity<>("강아지 정보가 삭제되었습니다.", HttpStatus.OK);
    }

    //특정 강아지 정보 조회
    @GetMapping("/v1/dogs/info/{id}")
    public ResponseEntity<DogInfoResponse> getDog(@PathVariable Long id) {
        return new ResponseEntity<>(dogService.findDog(id), HttpStatus.OK);
    }
}
