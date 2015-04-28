package com.mascova.caliga.service;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.github.dandelion.datatables.core.ajax.DataSet;
import com.github.dandelion.datatables.core.ajax.DatatablesCriterias;
import com.mascova.caliga.domain.User;

/**
 * Created by zulfy on 12/29/14.
 */
public interface UserService extends BaseService<User, String>{
    /**
     * <p>
     * Query used to populate the DataTables that display the list of users.
     *
     * @param criterias
     *            The DataTables criterias used to filter the users.
     *            (maxResult, filtering, paging, ...)
     * @return a bean that wraps all the needed information by DataTables to
     *         redraw the table with the data.
     */
    public DataSet<User> findUsersWithDatatablesCriterias(DatatablesCriterias criterias);

    public User findByEmailAndActivationKey(String email, String activationKey);

    public void resetPassword(User user);

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    User findByEmail(String email);
}