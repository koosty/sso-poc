package com.mascova.caliga.resource;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.dandelion.datatables.core.ajax.DataSet;
import com.github.dandelion.datatables.core.ajax.DatatablesCriterias;
import com.github.dandelion.datatables.core.ajax.DatatablesResponse;
import com.mascova.caliga.domain.User;
import com.mascova.caliga.service.UserService;

/**
 * Created by zulfy on 12/30/14.
 */
@Controller
@RequestMapping(value="/api/user", method = RequestMethod.GET)
public class UserResource {

    @Autowired
    private UserService userService;

    @PreAuthorize("true")
    @RequestMapping(value = "/findEntries")
    public @ResponseBody
    DatatablesResponse<User> findAllForDataTables(HttpServletRequest request) {
        DatatablesCriterias criterias = DatatablesCriterias.getFromRequest(request);
        DataSet<User> users = userService.findUsersWithDatatablesCriterias(criterias);
        return DatatablesResponse.build(users, criterias);
    }
}
