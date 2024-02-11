package com.tm.api.services;

import com.tm.api.exceptions.UserAlreadyExistsException;
import com.tm.api.model.dto.LoginResponse;
import com.tm.api.model.dto.SignInDto;
import com.tm.api.model.dto.UserDto;
import com.tm.api.model.entity.User;
import com.tm.api.model.enumerations.UserRole;
import com.tm.api.repository.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService implements UserDetailsService {

    private final UserRepository repository;

    private final TokenProvider tokenService;

    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository repository, TokenProvider tokenService, @Lazy AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return repository.findByFullName(username);
    }

    public LoginResponse signUp(UserDto data) throws UserAlreadyExistsException {
        if (repository.findByFullName(data.getFullName()) != null) {
            throw new UserAlreadyExistsException("Username already exists");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.getPassword());
        User newUser = User.builder().fullName(data.getFullName()).role(UserRole.USER).password(encryptedPassword).dateBirthday(data.getDateBirthday()).email(data.getEmail()).build();
        repository.save(newUser);
        return LoginResponse.builder().token(tokenService.generateAccessToken(newUser)).build();
    }

    public LoginResponse signIn(SignInDto data) {
        UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(data.getFullName(), data.getPassword());
        Authentication authUser = authenticationManager.authenticate(usernamePassword);
        String accessToken = tokenService.generateAccessToken((User) authUser.getPrincipal());
        return LoginResponse.builder().token(accessToken).build();
    }
}