package com.dangProject.commondto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SingleResponseDto <T> {
    private T data;
}
