package com.dangProject.member.region;

import com.dangProject.commonDto.EnumModel;
import lombok.Getter;

public enum RegionName implements EnumModel {

    GANGNAM_GU("강남구"),
    GANGSEO_GU("강서구"),
    GANGDONG_GU("강동구");

    //일단 샘플로 추가함.

    @Getter
    public String value;

    RegionName(String value) {
        this.value = value;
    }

    @Override
    public String getKey() {
        return name();
    }

    @Override
    public String getValue() {
        return value;
    }
}
