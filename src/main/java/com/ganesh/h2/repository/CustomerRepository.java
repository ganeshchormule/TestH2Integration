package com.ganesh.h2.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.ganesh.h2.model.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Long>{
    List<Customer> findByLastName(String lastName);
} 