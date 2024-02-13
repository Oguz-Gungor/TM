package com.tm.api.model.dto;

import com.tm.api.model.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.sql.Date;

@Data
@NoArgsConstructor
@SuperBuilder
public class UserInfoDto {

    public UserInfoDto(User user) {
        email = user.getEmail();
        dateBirthday = user.getDateBirthday();
        fullName = user.getFullName();
    }

    protected String email;

    protected Date dateBirthday;

    protected String fullName;

}
