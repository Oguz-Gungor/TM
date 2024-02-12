package com.tm.api.filter;

import com.tm.api.repository.UserRepository;
import com.tm.api.services.TokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    private final TokenProvider tokenService;
    private final UserRepository userRepository;

    public SecurityFilter(TokenProvider tokenService, UserRepository userRepository) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    private static final String AUTHORIZATION_FIELD_HEADER_KEY = "Authorization";
    private static final String BEARER_TOKEN_KEY = "Bearer ";

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        var token = this.recoverToken(request);
        if (token != null) {
            var username = tokenService.validateToken(token);
            var user = userRepository.findByFullName(username);
            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader(AUTHORIZATION_FIELD_HEADER_KEY);
        if (authHeader == null)
            return null;
        return authHeader.replace(BEARER_TOKEN_KEY, "");
    }
}