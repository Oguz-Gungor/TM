package com.tm.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
@Table(name = "\"user\"")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String email;

    @Column(name = "date_birthday")
    private Date dateBirthday;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "date_registered")
    private Date dateRegistered;


}
