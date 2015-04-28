package com.mascova.caliga.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.mascova.caliga.domain.Authority;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
