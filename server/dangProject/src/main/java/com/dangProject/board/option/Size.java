package com.dangProject.board.option;

import com.dangProject.common.EnumModel;

public enum Size implements EnumModel {
    SMALL("소형견"),
    MIDDLE("중형견"),
    LARGE("대형견");

    public String value;

    Size(String value) {
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
