package com.dangProject.dog.mapper;

import com.dangProject.dog.domain.Dog;
import com.dangProject.dog.dto.DogInfoPatchDto;
import com.dangProject.dog.dto.DogResponse;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface DogMapper {

    Dog dogPathToDog(DogInfoPatchDto dogInfoPatchDto);
    DogResponse dogToDogResponse(Dog dog);
}
