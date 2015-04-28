package com.mascova.caliga.service;

import java.util.List;

/**
 * Created by zulfy on 12/30/14.
 */
public interface BaseService<T, ID> {

    public T findById(ID id);

    public T saveOrUpdate(T entity);

    public void delete(T entity);

    public void deleteById(ID id);

    public Long getTotalData();

    public List<T> getAll();

}
