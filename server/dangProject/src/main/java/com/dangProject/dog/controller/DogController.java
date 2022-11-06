package com.dangProject.dog.controller;

import com.dangProject.dog.dto.DogInfoPatchDto;
import com.dangProject.dog.dto.DogResponse;
import com.dangProject.dog.dto.DogValidationPostDto;
import com.dangProject.dog.service.DogService;
import com.dangProject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/dogs")
public class DogController {

    private final DogService dogService;
    private final MemberService memberService;

    @PostMapping("/validation")
    public ResponseEntity registerDogNum(@Valid @RequestBody DogValidationPostDto dogValidationPostDto) throws IOException {
        dogService.registerRegNo(dogValidationPostDto);
        return new ResponseEntity<>("견주 인증이 완료되었습니다.", HttpStatus.OK);
    }

    //견주 인증 후, 강아지 정보 등록
    @PatchMapping("/info/{id}")
    public ResponseEntity registerInfo(@PathVariable long id,
                                       @Valid @RequestBody DogInfoPatchDto dogInfoPatchDto) {
        Long memberId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        dogInfoPatchDto.setId(id);
        dogService.addDog(dogInfoPatchDto);
        memberService.certificate(memberId);
        return new ResponseEntity<>(dogService.findDog(id), HttpStatus.OK);
    }

    //강아지 정보 삭제
    @DeleteMapping("/info/{id}")
    public ResponseEntity deleteInfo(@PathVariable Long id) {
        dogService.delete(id);
        return new ResponseEntity<>("강아지 정보가 삭제되었습니다.", HttpStatus.OK);
    }

    //특정 강아지 정보 조회
    @GetMapping("/info/{id}")
    public ResponseEntity<DogResponse> getDog(@PathVariable Long id) {
        return new ResponseEntity<>(dogService.findDog(id), HttpStatus.OK);
    }
}
