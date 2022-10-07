package com.dangProject.dog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DogValidationPostDto {

    private String dog_reg_no;
    private String owner_nm;
}
