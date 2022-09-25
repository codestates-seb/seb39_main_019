package com.dangProject.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "회원 정보를 찾을 수 없습니다."),
    MEMBER_EXISTS(409, "회원 정보가 이미 존재합니다."),
    POST_NOT_FOUND(404, "게시글을 찾을 수 없습니다."),
    CANNOT_CHANGE_POST(403, "게시글을 수정할 수 없습니다."),
    DOG_REG_NO_EXISTS(409, "강아지 등록번호가 이미 존재합니다."),
    DOG_NOT_FOUND(404, "강아지 정보를 찾을 수 없습니다."),
    DOG_INFO_NOT_VALID(404, "강아지 등록번호가 올바르지 않습니다.");


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
