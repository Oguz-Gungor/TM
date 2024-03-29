package com.tm.api.model.projection;

import com.tm.api.model.enumerations.UserRole;

import java.sql.Date;

public interface IUser {

    Long getId();

    String getEmail();

    Date getDateBirthday();

    String getFullName();

    UserRole getRole();
}
