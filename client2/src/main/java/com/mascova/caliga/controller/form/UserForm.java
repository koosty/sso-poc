package com.mascova.caliga.controller.form;

import java.io.Serializable;
import java.util.Set;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import com.mascova.caliga.domain.Authority;
import com.mascova.caliga.domain.User;

/**
 * Created by zulfy on 12/29/14.
 */
public class UserForm implements Serializable{

    private static final long serialVersionUID = 293346032833877355L;

    @NotBlank
    private String login;
    private String firstName;
    private String lastName;
    @NotBlank
    @Email
    private String email;
    private Boolean active;
    private String password;
    private String password2;
    private Set<Authority> authorities;
    private String baseUrl;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
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

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public User bindToModel(User user){
        user.setFirstName(this.firstName);
        user.setLastName(this.lastName);
        user.setLogin(this.login);
        user.setEmail(this.email);
        if(this.password != null) {
            user.setPassword(this.password);
        }
        if(this.active != null){
            user.setActivated(this.active);
        }
        user.setAuthorities(this.authorities);
        return user;
    }

    public void bindToForm(User user){
        this.firstName  = user.getFirstName();
        this.lastName   = user.getLastName();
        this.login      = user.getLogin();
        this.email      = user.getEmail();
        this.password   = user.getPassword();
        this.active     = user.getActivated();
        this.authorities= user.getAuthorities();
    }
}