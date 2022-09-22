package com.dangProject.post.option;

import com.dangProject.common.EnumModel;

public enum Personality implements EnumModel {
    ACTIVE("# 활발함"),
    TIMID("# 소심함"),
    SHY("# 겁많음"),
    CUTE("# 애교많음");

    public String value;

    Personality(String value) {
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