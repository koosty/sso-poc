package com.mascova.caliga.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mascova.caliga.domain.User;

/**
 * Spring Data JPA repository for the User entity.
 */
public interface UserRepository extends JpaRepository<User, String> {
    
    @Query("select u from User u join fetch u.authorities where u.login = ?1")
    User getUserWithAuthorities(String login);

    User findByEmailAndActivationKey(String email, String activationKey);

    User findByEmail(String email);
}
