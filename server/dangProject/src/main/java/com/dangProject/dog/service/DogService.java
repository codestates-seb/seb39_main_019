package com.dangProject.dog.service;

import com.dangProject.dog.domain.Dog;
import com.dangProject.dog.dto.DogInfoPatchDto;
import com.dangProject.dog.dto.DogResponse;
import com.dangProject.dog.dto.DogValidationPostDto;
import com.dangProject.dog.mapper.DogMapper;
import com.dangProject.dog.repository.DogRepository;
import com.dangProject.exception.BusinessLogicException;
import com.dangProject.exception.ExceptionCode;
import com.dangProject.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class DogService {

    private final DogRepository dogRepository;

    @Transactional
    public Dog registerRegNo(DogValidationPostDto dogValidationPostDto) {
        verifyDogRegNo(dogValidationPostDto.getDog_reg_no());

        return dogRepository.save(Dog.builder()
                        .dogRegNo(dogValidationPostDto.getDog_reg_no())
                        .build());
    }

    public void verifyDogRegNo(String dog_reg_no) {
        Optional<Dog> dog = dogRepository.findByDogRegNo(dog_reg_no);
        if(dog.isPresent())
            throw new BusinessLogicException(ExceptionCode.DOG_REG_NO_EXISTS);
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

    @Transactional(readOnly = true)
    public Dog findVerifiedDog(Long id) {

        Optional<Dog> optionalDog =
                dogRepository.findById(id);
        Dog findDog =
                optionalDog.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.DOG_NOT_FOUND));
        return findDog;
    }

}
