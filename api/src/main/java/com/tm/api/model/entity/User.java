package com.tm.api.model.entity;

import com.tm.api.constants.UserRoleKeys;
import com.tm.api.model.enumerations.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "\"user\"")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String email;

    @Column(name = "date_birthday")
    private Date dateBirthday;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "password")
    private String password;


    @Column(name = "date_registered")
    @CreationTimestamp
    private Date dateRegistered;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN) {
            return List.of(new SimpleGrantedAuthority(UserRoleKeys.ADMIN_ROLE), new SimpleGrantedAuthority(UserRoleKeys.USER_ROLE));
        }
        return List.of(new SimpleGrantedAuthority(UserRoleKeys.USER_ROLE));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return fullName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
