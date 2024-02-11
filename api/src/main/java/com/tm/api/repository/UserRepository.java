package com.tm.api.repository;

import com.tm.api.model.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends CrudRepository<User, Long> {

    UserDetails findByFullName(String fullName);
}
