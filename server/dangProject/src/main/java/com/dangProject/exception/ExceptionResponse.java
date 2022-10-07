package com.dangProject.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExceptionResponse {
    private int status;
    private String message;

    private ExceptionResponse(ExceptionCode exceptionCode) {
        this.status = exceptionCode.getStatus();
        this.message = exceptionCode.getMessage();
    }

    public static ExceptionResponse of(int status, String message) {
        return new ExceptionResponse(status, message);
    }
}