package com.tm.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Username is already in use")

public class UserAlreadyExistsException extends Exception{
    public UserAlreadyExistsException(String errorMessage) {
        super(errorMessage);
    }

}
