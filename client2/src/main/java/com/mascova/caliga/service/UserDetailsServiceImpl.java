package com.mascova.caliga.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mascova.caliga.domain.Authority;
import com.mascova.caliga.domain.User;
import com.mascova.caliga.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {

		String lowercaseUsername = username.toLowerCase();

		User userFromDatabase = userRepository.getUserWithAuthorities(lowercaseUsername);

		if (userFromDatabase == null) {
			throw new UsernameNotFoundException("User " + lowercaseUsername
					+ " was not found in the database");
		}

		Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
		for (Authority authority : userFromDatabase.getAuthorities()) {
			GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(
					authority.getName());
			grantedAuthorities.add(grantedAuthority);
		}

		return new org.springframework.security.core.userdetails.User(
				lowercaseUsername, userFromDatabase.getPassword(),
				grantedAuthorities);

	}

}
