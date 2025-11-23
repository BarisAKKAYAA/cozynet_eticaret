package com.example.eticaretbackend.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders") // "order" SQL keyword olduğu için tablo adı "orders"
public class Order extends BaseEntity {

    // Toplam fiyat
    @Column(nullable = false)
    private Double totalPrice;

    // Sipariş durumu
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    // Siparişi veren müşteri
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    // Teslimat adresi
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shipping_address_id", nullable = false)
    private CustomerAddress shippingAddress;

    // Fatura adresi (isteğe bağlı olabilir)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "billing_address_id")
    private CustomerAddress billingAddress;

    // Sipariş kalemleri
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;
}
