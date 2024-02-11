package com.tm.api.model.dto;

import lombok.Data;
import lombok.Getter;

import java.sql.Date;

@Getter
@Data
public class UserDto {
    private String email;

    private Date dateBirthday;

    private String fullName;

    private String password;

}
