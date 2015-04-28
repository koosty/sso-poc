package com.mascova.caliga.repository;

import java.util.List;

import com.github.dandelion.datatables.core.ajax.DatatablesCriterias;
import com.mascova.caliga.domain.User;

public interface UserSearchRepository {

	List<User> findUserWithDatatablesCriterias(DatatablesCriterias criterias);

	Long getTotalCount();

	Long getFilteredCount(DatatablesCriterias criterias);
}
