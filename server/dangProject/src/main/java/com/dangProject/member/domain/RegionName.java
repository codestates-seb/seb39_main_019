package com.dangProject.member.domain;

import lombok.Getter;

public enum RegionName {

    GANGNAM_GU("강남구"),
    GANGSEO_GU("강서구"),
    GANGDONG_GU("강동구");

    //일단 샘플로 추가함.

    @Getter
    private String status;

    RegionName(String status) {
        this.status = status;
    }

}
