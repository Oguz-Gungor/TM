package com.tm.api.loaders;

import com.tm.api.model.entity.User;
import com.tm.api.model.enumerations.UserRole;
import com.tm.api.repository.UserRepository;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader {


    private UserRepository userRepository;
    public static final String RESERVED_ADMIN_USERNAME = "Admin";
    public static final String ADMIN_PASSWORD = "Admin";

    private static final String ADMIN_EMAIL = "admin@admin.com";

    public DatabaseLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        seedUsersTable();
    }

    private void seedUsersTable() {
        UserDetails adminUser = userRepository.findByRole(UserRole.ADMIN);
        if (adminUser == null) {
            User admin = User.builder().role(UserRole.ADMIN).email(ADMIN_EMAIL).password(new BCryptPasswordEncoder().encode(ADMIN_PASSWORD)).fullName(RESERVED_ADMIN_USERNAME).build();
            userRepository.save(admin);
        }
    }

}
