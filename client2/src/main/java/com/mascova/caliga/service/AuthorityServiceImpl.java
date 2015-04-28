package com.mascova.caliga.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mascova.caliga.domain.Authority;
import com.mascova.caliga.domain.User;
import com.mascova.caliga.repository.AuthorityRepository;
import com.mascova.caliga.repository.UserRepository;

@Service(value = "authorityService")
public class AuthorityServiceImpl implements AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Authority findById(String s) {
        return authorityRepository.findOne(s);
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class, timeout = 30)
    public Authority saveOrUpdate(Authority entity) {
        return authorityRepository.save(entity);
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class, timeout = 30)
    public void delete(Authority entity) {
        authorityRepository.delete(entity);
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class, timeout = 30)
    public void deleteById(String s) {
        Authority authority = authorityRepository.findOne(s);
        authorityRepository.delete(authority);

    }

    @Override
    public Long getTotalData() {
        return authorityRepository.count();
    }

    @Override
    public List<Authority> getAll() {
        return authorityRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.REQUIRED)
    public Set<Authority> findByUserId(String userId) {
        User user = userRepository.findOne(userId);
        return user.getAuthorities();
    }
}
