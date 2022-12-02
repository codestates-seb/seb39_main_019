package com.dangProject.dog.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DogValidationRequestDto {
    private Long memberId;
    private String dog_reg_no;
    private String owner_nm;
}
