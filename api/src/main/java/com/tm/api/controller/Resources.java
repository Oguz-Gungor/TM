package com.tm.api.controller;

import com.tm.api.constants.ApiPaths;
import com.tm.api.model.dto.SignUpDto;
import com.tm.api.model.dto.UserDto;
import com.tm.api.model.dto.UserInfoDto;
import com.tm.api.model.entity.User;
import com.tm.api.services.AuthService;
import com.tm.api.services.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPaths.RESOURCES)
public class Resources {

    private final AuthService authService;
    private final UserService userService;

    public Resources(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping("/hi")
    public String resourcesTest() {
        return "Welcome " + authService.getAuthenticatedUserInfo().getFullName();
    }

    @GetMapping("/info")
    public UserDto getUserInfo() {
        return new UserDto(authService.getAuthenticatedUserInfo());
    }

    @PatchMapping("/update")
    public UserInfoDto updateUserInfo(@RequestBody UserDto newUserInfo) {
        return userService.updateUser(newUserInfo);
    }

}
