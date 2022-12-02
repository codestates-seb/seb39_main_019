package com.dangProject.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "회원 정보를 찾을 수 없습니다."),
    MEMBER_EXISTS(409, "회원 정보가 이미 존재합니다."),
    NICKNAME_EXISTS(409, "중복된 닉네임 입니다."),
    POST_NOT_FOUND(404, "게시글을 찾을 수 없습니다."),
    FILE_NOT_FOUND(404, "이미지를 찾을 수 없습니다"),
    FILE_TYPE_NOT_ACCEPTED(406, "허용되지 않은 타입의 파일입니다."),
    DOG_REG_NO_EXISTS(409, "강아지 등록번호가 이미 존재합니다."),
    DOG_NOT_FOUND(404, "강아지 정보를 찾을 수 없습니다."),
    DOG_INFO_NOT_VALID(404, "강아지 등록번호가 올바르지 않습니다."),
    COMMENT_NOT_FOUND(404, "댓글을 찾을 수 없습니다."),
    INVALID_INPUT_FORMAT(400, "이메일, 비밀번호 또는 닉네임 형식이 올바르지 않습니다."),
    INVALID_NICKNAME_FORMAT(400, "올바르지 않은 닉네임 형식입니다."),
    INVALID_PASSWORD_FORMAT(400, "올바르지 않은 비밀번호 형식입니다."),
    EMAIL_NOT_FOUND(400, "이메일을 찾을 수 없습니다."),
    PASSWORD_NOT_FOUND(400, "비밀번호가 올바르지 않습니다."),
    BAD_REQUEST(400, "잘못된 요청입니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
