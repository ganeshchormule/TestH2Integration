package com.ganesh.h2.repository;

import org.springframework.data.repository.CrudRepository;

import com.ganesh.h2.model.User;

public interface UserRepository extends CrudRepository<User, Long> {

}
