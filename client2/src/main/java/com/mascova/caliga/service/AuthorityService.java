package com.mascova.caliga.service;

import java.util.Set;

import com.mascova.caliga.domain.Authority;

/**
 * Created by zulfy on 01/01/15.
 */
public interface AuthorityService extends BaseService<Authority, String> {

    Set<Authority> findByUserId(String userId);

}