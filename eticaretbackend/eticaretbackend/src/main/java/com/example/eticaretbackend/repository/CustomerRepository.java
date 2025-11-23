package com.example.eticaretbackend.repository;

import com.example.eticaretbackend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Customer tablosu için CRUD işlemleri ve özel sorgular
 */
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByEmail(String email); // E-mail kontrolu yapmak için kullanılır
    boolean existsByUsername(String username); // // Kullanıcı adı kontrolu yapmak için kullanılır


    // Email adresine göre müşteri bul
    Optional<Customer> findByEmail(String email);

    // Kullanıcı adına göre müşteri bul
    Optional<Customer> findByUsername(String username);




}
