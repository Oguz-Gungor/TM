package com.tm.api.repository;

import com.tm.api.model.entity.User;
import com.tm.api.model.enumerations.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {

    UserDetails findByFullName(String fullName);

    UserDetails findByRole(UserRole role);

}
