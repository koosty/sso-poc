package com.mascova.caliga.controller.form;

import java.io.Serializable;

import org.hibernate.validator.constraints.NotEmpty;

import com.mascova.caliga.domain.User;

/**
 * Created by zulfy on 1/15/15.
 */
public class ActivationForm implements Serializable{

    private static final long serialVersionUID = -7348396999775664052L;

    private String email;
    private String activationKey;
    @NotEmpty
    private String password;
    @NotEmpty
    private String password2;
    private String baseUrl;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public User bindToModel(User user){
        user.setEmail(this.email);
        user.setActivationKey(null);
        user.setActivated(true);
        if(this.password != null) {
            user.setPassword(this.password);
        }
        return user;
    }

    public void bindToForm(User user){
        this.email          = user.getEmail();
        this.password       = user.getPassword();
        this.activationKey  = user.getActivationKey();
    }
}