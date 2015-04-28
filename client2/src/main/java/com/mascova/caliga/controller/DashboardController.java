/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.mascova.caliga.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author irfan
 */
@Controller
@RequestMapping("/dashboard")
public class DashboardController {
    
    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView root() {
        return new ModelAndView("dashboard/dashboard-index");
    }
    
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public ModelAndView index() {
        return root();
    }      
    
}
