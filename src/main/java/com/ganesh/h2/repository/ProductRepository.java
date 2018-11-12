package com.ganesh.h2.repository;

import org.springframework.data.repository.CrudRepository;

import com.ganesh.h2.model.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}
