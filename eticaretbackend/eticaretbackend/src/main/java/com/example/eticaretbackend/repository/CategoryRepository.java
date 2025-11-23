package com.example.eticaretbackend.repository;

import com.example.eticaretbackend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Category tablosu için CRUD işlemleri ve özel sorgular
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // İsim ile kategori bul
    Category findByName(String name);



}
