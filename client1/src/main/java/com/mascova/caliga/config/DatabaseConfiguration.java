package com.mascova.caliga.config;

import javax.sql.DataSource;

import liquibase.integration.spring.SpringLiquibase;

import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class DatabaseConfiguration implements EnvironmentAware {

    private Environment             env;
    @Bean
    public SpringLiquibase liquibase(DataSource dataSource) {
        SpringLiquibase liquibase = new SpringLiquibase();
        liquibase.setDataSource(dataSource);
        liquibase.setChangeLog("classpath:config/liquibase/master.xml");
        liquibase.setDropFirst(true);
        // liquibase.setContexts("development, production");
        if (!env.acceptsProfiles("liquibase")) {
            liquibase.setShouldRun(false);
        }
        return liquibase;
    }

    public void setEnvironment(Environment env) {
        this.env = env;
        new RelaxedPropertyResolver(env, "spring.datasource.");
    }

}
