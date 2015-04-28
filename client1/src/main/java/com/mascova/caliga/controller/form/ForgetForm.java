package com.mascova.caliga.controller.form;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import java.io.Serializable;

/**
 * Created by zulfy on 1/15/15.
 */
public class ForgetForm implements Serializable{

    private static final long serialVersionUID = 8591448077197032732L;

    @NotEmpty
    @Email
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}