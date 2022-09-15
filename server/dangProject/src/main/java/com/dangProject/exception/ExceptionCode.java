package com.dangProject.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    POST_NOT_FOUND(404, "Post not found"),
    CANNOT_CHANGE_POST(403, "Post can not change");
    //예외 코드는 더 추가예정

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
