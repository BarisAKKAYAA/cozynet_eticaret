package com.example.eticaretbackend.repository;

import com.example.eticaretbackend.model.Cart;
import com.example.eticaretbackend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

/**
 * Cart tablosu için CRUD işlemleri ve özel sorgular
 */
public interface CartRepository extends JpaRepository<Cart, Long> {

    // Belirli bir müşterinin sepetindeki tüm ürünleri getir
    List<Cart> findByCustomer(Customer customer);

    // Müşterinin belirli bir ürünü daha önce sepete ekleyip eklemediğini kontrol etmek için kullanılır.
    Optional<Cart> findByCustomerIdAndProductId(Long customerId, Long productId);

}
