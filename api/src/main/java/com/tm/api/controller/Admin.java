package com.tm.api.controller;

import com.tm.api.constants.ApiPaths;
import com.tm.api.model.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.ADMIN)
public class Admin {

    @GetMapping("/hi")
    public String adminTest() {
        String fullName = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getFullName();
        return "Welcome " + fullName + " as Admin";
    }
}
