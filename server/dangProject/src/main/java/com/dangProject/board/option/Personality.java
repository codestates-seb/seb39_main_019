package com.dangProject.board.option;

import com.dangProject.common.EnumModel;

public enum Personality implements EnumModel {
    ACTIVE("# 활발함"),
    SHY("# 소심함"),
    KIND("# 상냥함"),
    GENTLE("# 온화함");

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