package com.example.eticaretbackend.repository;

import com.example.eticaretbackend.model.OrderItem;
import com.example.eticaretbackend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * OrderItem tablosu için CRUD işlemleri ve özel sorgular
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // Belirli bir siparişin ürünlerini getir
    List<OrderItem> findByOrder(Order order);
}
