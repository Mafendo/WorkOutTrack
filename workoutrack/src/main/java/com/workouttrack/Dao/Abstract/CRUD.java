package com.workouttrack.Dao.Abstract;

import java.util.List;
import java.util.Optional;

public interface CRUD<T, ID> {
    T insert(T entity);

    T update(ID id, T entity);

    Optional<T> findById(ID id);

    List<T> findAll();

    boolean deleteById(ID id);
}