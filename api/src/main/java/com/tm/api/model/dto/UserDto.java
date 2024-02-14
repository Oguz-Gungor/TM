package com.tm.api.model.dto;

import com.tm.api.model.entity.User;
import com.tm.api.model.enumerations.UserRole;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@SuperBuilder
public class UserDto extends UserInfoDto {

    private UserRole role;

    public UserDto(User user) {
        super(user);
        role = user.getRole();
    }
}
