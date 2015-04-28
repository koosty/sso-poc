/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.mascova.caliga.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.mascova.caliga.controller.form.ForgetForm;
import com.mascova.caliga.domain.User;
import com.mascova.caliga.service.UserService;

/**
 *
 * @author irfan
 */
@Controller
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserService userService;
    
    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView root() {
        return new ModelAndView("login");
    }

    @RequestMapping(value = "/forget", method = RequestMethod.GET)
    public String forgetPassword(Model model){
        model.addAttribute("forgetForm", new ForgetForm());
        return "page-lost-password";
    }

    @RequestMapping(value = "/forget", method = RequestMethod.POST)
    public String sendResetPassword(Model model, @Valid ForgetForm forgetForm, BindingResult result){
        if (result.hasErrors()) {
            model.addAttribute("forgetForm", forgetForm);
            model.addAttribute("errorValidate", result.getAllErrors());
            return "page-lost-password";
        }
        User user = userService.findByEmail(forgetForm.getEmail());
        if(user == null){
            model.addAttribute("errorMsg", "email not found");
            return "page-lost-password";
        }
        model.addAttribute("successMsg", "Please check your email to reset password");
        userService.resetPassword(user);

        return "page-lost-password";
    }
}
