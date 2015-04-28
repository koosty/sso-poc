/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.mascova.caliga.controller;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.mascova.caliga.controller.form.UserForm;
import com.mascova.caliga.domain.Authority;
import com.mascova.caliga.domain.User;
import com.mascova.caliga.service.AuthorityService;
import com.mascova.caliga.service.UserService;

/**
 *
 * @author irfan
 */
@Controller
@RequestMapping("/dashboard/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthorityService authorityService;

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView root() {
        return new ModelAndView("user/user-index");
    }
    
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public ModelAndView index() {
        return root();
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    public String detail(Model model, @RequestParam(value = "id", required = false, defaultValue = "0") User user) {
        UserForm userForm = new UserForm();

        if(user != null){
            userForm.bindToForm(user);
            model.addAttribute("isEdit", true);
        }else{
            model.addAttribute("isEdit", false);
        }

        model.addAttribute("userForm", userForm);
        model.addAttribute("auths", authorityService.getAll());
        return "user/user-detail";
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String save(@Valid UserForm userForm, BindingResult result, Model model, RedirectAttributes redirectAttributes, HttpServletRequest request) {

        if (result.hasErrors()) {
            model.addAttribute("userForm", userForm);
            model.addAttribute("auths", authorityService.getAll());
            return "user/user-detail";
        }
        User user = userForm.bindToModel(new User());
        userService.saveOrUpdate(user);

        redirectAttributes.addFlashAttribute("statusMessageKey", new StringBuilder("User created: ").append(user.getFirstName()).append(" ").append(user.getLastName()).toString());
        return "redirect:index";
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public String delete(@RequestParam(value = "id", required = true, defaultValue = "0") User user, Model model) {
        userService.delete(user);
        model.addAttribute("statusMessageKey", "User Deleted" + ": " + user.getLogin());
        return "user/user-index";
    }

    @RequestMapping(value = "/profile", method = RequestMethod.GET)
    public String profile(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(auth.getName());
        UserForm userForm = new UserForm();
        userForm.bindToForm(user);
        model.addAttribute("userForm", userForm);
        return "user/user-profile";
    }

    @RequestMapping(value = "/profile", method = RequestMethod.POST)
    public String profileSave(@Valid UserForm userForm, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("userForm", userForm);
            model.addAttribute("auths", authorityService.getAll());
            return "user/user-profile";
        }
        User user = userForm.bindToModel(new User());
        Set<Authority> authorityList = authorityService.findByUserId(user.getLogin());
        user.setAuthorities(authorityList);
        userService.saveOrUpdate(user);

        model.addAttribute("statusMessageKey", new StringBuilder("User created: ").append(user.getFirstName()).append(" ").append(user.getLastName()).toString());
        return "user/user-profile";
    }

}