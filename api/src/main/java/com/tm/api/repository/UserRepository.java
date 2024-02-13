package com.tm.api.repository;

import com.tm.api.model.entity.User;
import com.tm.api.model.enumerations.UserRole;
import com.tm.api.model.projection.IUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByFullName(String fullName);

    User findByRole(UserRole role);

    Page<IUser> findAllBy(Pageable pageable);

}
