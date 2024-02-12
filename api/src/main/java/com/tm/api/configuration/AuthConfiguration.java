package com.tm.api.configuration;

import com.tm.api.constants.ApiPaths;
import com.tm.api.constants.UserRoleKeys;
import com.tm.api.filter.SecurityFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class AuthConfiguration {

    /**
     * Security filter Bean
     */
    private final SecurityFilter securityFilter;

    public AuthConfiguration(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    /**
     * APIs that does not need any authority to be used
     */
    private static final String[] AUTH_WHITELIST = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
            ApiPaths.AUTH + "/**",
            ApiPaths.HEALTH_CHECK
    };

    /**
     * APIs only to be used by users with Admin Authority
     */
    private static final String[] ADMIN_API = {
            ApiPaths.ADMIN + "/**"
    };

    /**
     * APIs can be used by signedIn users
     */
    private static final String[] USER_API = {
            ApiPaths.RESOURCES + "/**"
    };

    /**
     * Bean to configure http security filter operations
     *
     * @param httpSecurity builder to build security filter chain
     * @return Security filter chain to be used in spring security flow
     * @throws Exception from csrf
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(AUTH_WHITELIST).permitAll()
                        .requestMatchers(ADMIN_API).hasAuthority(UserRoleKeys.ADMIN_ROLE)
                        .requestMatchers(USER_API).hasAnyAuthority(UserRoleKeys.ADMIN_ROLE, UserRoleKeys.USER_ROLE)
                        .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    /**
     * Authentication Manager bean to be used spring security flow
     *
     * @param authenticationConfiguration existing cınfiguration
     * @return configured authenticationManager
     * @throws Exception from getAuthenticationManager
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * Password Encoder Bean to be used for spring security flow
     *
     * @return BCryptPasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}