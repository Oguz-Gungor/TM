package com.tm.api.controller;

import com.tm.api.constants.ApiPaths;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPaths.HEALTH_CHECK)
public class HealthCheck {
    @GetMapping
    public String alive() {
        return "server is up";
    }
}
