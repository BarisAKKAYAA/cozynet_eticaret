package com.example.eticaretbackend.repository;

import com.example.eticaretbackend.model.Order;
import com.example.eticaretbackend.model.Customer;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Order tablosu için CRUD işlemleri ve özel sorgular
 */
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Belirli bir müşterinin siparişlerini getir
    List<Order> findByCustomer(Customer customer);

    // Tüm siparişleri getir
    @Override
    @EntityGraph(attributePaths = {
            "customer",
            "shippingAddress",
            "billingAddress",
            "orderItems",
            "orderItems.product"
    })
    List<Order> findAll();



}
