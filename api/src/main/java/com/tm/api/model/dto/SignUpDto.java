package com.tm.api.model.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Getter
@Data
@SuperBuilder
public class SignUpDto extends UserInfoDto {

    private String password;

}
