package com.mascova.caliga.config;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.jasig.cas.client.session.SingleSignOutFilter;
import org.jasig.cas.client.validation.Cas20ServiceTicketValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.cas.ServiceProperties;
import org.springframework.security.cas.authentication.CasAuthenticationProvider;
import org.springframework.security.cas.web.CasAuthenticationEntryPoint;
import org.springframework.security.cas.web.CasAuthenticationFilter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.mascova.caliga.security.Http401UnauthorizedEntryPoint;

@Configuration
@EnableWebMvcSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationSuccessHandler  authenticationSuccessHandler;

    @Autowired
    private LogoutSuccessHandler          logoutSuccessHandler;

    @Autowired
    private Http401UnauthorizedEntryPoint authenticationEntryPoint;

    @Autowired
    private UserDetailsService            userDetailsService;

    @SuppressWarnings("rawtypes")
    @Bean
    public AuthenticationUserDetailsService authenticationUserDetailsService() {
        UserDetailsByNameServiceWrapper authService = new UserDetailsByNameServiceWrapper(userDetailsService);
        return authService;
    }

    @Bean
    public Cas20ServiceTicketValidator cas20ServiceTicketValidator() {
        return new Cas20ServiceTicketValidator("https://localhost:9443");
    }

    public CasAuthenticationEntryPoint casAuthenticationEntryPoint() {
        CasAuthenticationEntryPoint caep = new CasAuthenticationEntryPoint();
        caep.setLoginUrl("https://localhost:9443/login");
        caep.setServiceProperties(serviceProperties());
        return caep;
    }

    @Bean
    public CasAuthenticationFilter casAuthenticationFilter() throws Exception {
        CasAuthenticationFilter casAuthenticationFilter = new CasAuthenticationFilter();
        casAuthenticationFilter.setAuthenticationManager(authenticationManager());
        return casAuthenticationFilter;
    }

    @Bean
    public CasAuthenticationProvider casAuthenticationProvider() {
        CasAuthenticationProvider casAuthenticationProvider = new CasAuthenticationProvider();
        casAuthenticationProvider.setAuthenticationUserDetailsService(authenticationUserDetailsService());
        casAuthenticationProvider.setServiceProperties(serviceProperties());
        casAuthenticationProvider.setTicketValidator(cas20ServiceTicketValidator());
        casAuthenticationProvider.setKey("an_id_for_this_auth_provider_only");
        return casAuthenticationProvider;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/bower_components/**").antMatchers("/assets/**").antMatchers("/scripts/**");
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        // auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());

        auth.authenticationProvider(casAuthenticationProvider());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @SuppressWarnings("deprecation")
    @Bean
    public LogoutFilter requestSingleLogoutFilter() {
        String redirect = null;
        try {
            redirect = URLEncoder.encode("http://localhost:9001/", "utf-8");
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        LogoutFilter lf = new LogoutFilter("https://localhost:9443/logout?service="+redirect, new SecurityContextLogoutHandler());
        lf.setFilterProcessesUrl("/j_spring_cas_security_logout");
        return lf;
    }

    @Bean
    public ServiceProperties serviceProperties() {
        ServiceProperties sp = new ServiceProperties();
        sp.setService("http://localhost:9001/j_spring_cas_security_check");
        sp.setSendRenew(false);
        return sp;
    }

    @Bean
    public SingleSignOutFilter singleLogoutFilter() {
        return new SingleSignOutFilter();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilter(casAuthenticationFilter());
        http.addFilterBefore(requestSingleLogoutFilter(), LogoutFilter.class);
        http.addFilterBefore(singleLogoutFilter(), CasAuthenticationFilter.class);
        http.logout().logoutSuccessUrl("/j_spring_cas_security_logout")
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout")).permitAll();
        http.csrf().disable();

        http.exceptionHandling().authenticationEntryPoint(casAuthenticationEntryPoint());

        // BEGIN Feature Page
        http.authorizeRequests().antMatchers("/dashboard/media-reach/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_CLIENT", "ROLE_ANALYST", "ROLE_CONTRIBUTOR");
        http.authorizeRequests().antMatchers("/dashboard/buzz-trends/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_CLIENT", "ROLE_ANALYST", "ROLE_CONTRIBUTOR");
        http.authorizeRequests().antMatchers("/dashboard/sources/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_CLIENT", "ROLE_ANALYST", "ROLE_CONTRIBUTOR");
        http.authorizeRequests().antMatchers("/dashboard/analysis/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_CLIENT", "ROLE_ANALYST");
        // END Feature Page

        // BEGIN ADMIN Page
        http.authorizeRequests().antMatchers("/dashboard/keyword/**").hasAnyAuthority("ROLE_ADMIN");
        http.authorizeRequests().antMatchers("/dashboard/admin/**").hasAnyAuthority("ROLE_ADMIN");
        http.authorizeRequests().antMatchers("/dashboard/user/**").hasAnyAuthority("ROLE_ADMIN");
        http.authorizeRequests().antMatchers("/dashboard/client/**").hasAnyAuthority("ROLE_ADMIN");
        http.authorizeRequests().antMatchers("/dashboard/contributor/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_CONTRIBUTOR");
        http.authorizeRequests().antMatchers("/dashboard/image/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_ANALYST", "ROLE_CONTRIBUTOR");
        http.authorizeRequests().antMatchers("/dashboard/settings/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_ANALYST");
        // END ADMIN Page

        // The Rest of Dashboard
        http.authorizeRequests().antMatchers("/dashboard/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_CLIENT", "ROLE_ANALYST", "ROLE_CONTRIBUTOR");

        // API
        http.authorizeRequests().antMatchers("/api/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_CLIENT", "ROLE_ANALYST", "ROLE_CONTRIBUTOR");
        http.authorizeRequests().antMatchers("/").permitAll();
    }
}
