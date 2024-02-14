package com.tm.api.model.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Getter
@NoArgsConstructor
@Data
@SuperBuilder
public class SignUpDto extends UserInfoDto {

    private String password;

}
