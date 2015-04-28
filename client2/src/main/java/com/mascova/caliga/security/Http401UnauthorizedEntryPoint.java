package com.mascova.caliga.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * Returns a 401 error code (Unauthorized) to the client.
 */
@Component
public class Http401UnauthorizedEntryPoint extends LoginUrlAuthenticationEntryPoint {

    public Http401UnauthorizedEntryPoint() {
        super("/login");
        // TODO Auto-generated constructor stub
    }

    /**
     * Always returns a 401 error code to the client.
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException arg2)
            throws IOException, ServletException {

        if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access Denied");
        } else {
            super.commence(request, response, arg2);
        }

        //
        // log.debug("Pre-authenticated entry point called. Rejecting access");
        // response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
        // "Access Denied");
    }
}
