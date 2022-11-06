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
    CANNOT_CHANGE_POST(403, "게시글을 수정할 수 없습니다."),
    BEARER_TOKEN_MISSED(400, "헤더에 bearer token 정보가 비어있습니다."),
    INVALID_SERVER_ERROR(500, "Internal Server Error 입니다."),
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
