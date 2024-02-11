package com.tm.api.controller;

import com.tm.api.exceptions.UserAlreadyExistsException;
import com.tm.api.model.dto.LoginResponse;
import com.tm.api.model.dto.SignInDto;
import com.tm.api.model.dto.UserDto;
import com.tm.api.services.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class Auth {
    private final AuthService service;

    public Auth(AuthService service) {
        this.service = service;
    }

    @PostMapping("/signUp")
    public LoginResponse signUp(@RequestBody UserDto user) throws UserAlreadyExistsException {
        return service.signUp(user);
    }

    @PostMapping("/signIn")
    public LoginResponse signIn(@RequestBody SignInDto data) {
        return service.signIn(data);
    }
}
