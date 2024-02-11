package com.tm.api.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class HealthCheck {
    @GetMapping("/alive")
    public String alive() {
        return "server is up";
    }
}
