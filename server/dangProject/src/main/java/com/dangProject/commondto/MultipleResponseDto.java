package com.dangProject.commondto;

import lombok.Getter;

import java.util.List;

@Getter
public class MultipleResponseDto<T> {
    private List<T> data;

    public MultipleResponseDto(List<T> data) {
        this.data = data;
    }

}
