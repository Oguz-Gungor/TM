package com.tm.api.controller;

import com.tm.api.constants.ApiPaths;
import com.tm.api.exceptions.UserNotFoundException;
import com.tm.api.model.dto.PaginationResponse;
import com.tm.api.model.dto.UserDto;
import com.tm.api.model.dto.UserInfoDto;
import com.tm.api.model.entity.User;
import com.tm.api.model.projection.IUser;
import com.tm.api.services.AuthService;
import com.tm.api.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPaths.ADMIN)
public class Admin {
    private final AuthService authService;
    private final UserService userService;

    public Admin(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping("/hi")
    public String adminTest() {
        return "Welcome " + authService.getAuthenticatedUserInfo().getFullName() + " as Admin";
    }

    @PatchMapping("/update/{id}")
    public UserInfoDto updateUserInfo(@RequestBody UserDto newUserInfo, @PathVariable Long id) throws UserNotFoundException {
        return userService.updateUser(newUserInfo, id);
    }

    @PatchMapping("/promote/{id}")
    public UserDto promoteUser(@PathVariable Long id) throws UserNotFoundException {
        return userService.promoteUser(id);
    }

    @GetMapping("/all")
    public PaginationResponse<IUser> getAll(@RequestParam int page, @RequestParam int size) {
        return userService.getUsers(page, size);
    }
}
