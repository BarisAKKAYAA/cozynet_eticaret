package com.example.eticaretbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem extends BaseEntity {

    // Ürün adedi, en az 1 olmalı
    @Min(1)
    private Integer quantity = 1;

    // Ürün fiyatı, boş bırakılamaz
    @Column(nullable = false)
    private Double price;

    // Her sipariş kaleminin bir siparişe ait olduğunu belirtir ve sipariş bilgisi yalnızca ihtiyaç duyulduğunda veritabanından yüklenir.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;


    // Her sipariş kaleminin bir ürüne ait olduğunu belirtir ve ürün bilgisi yalnızca ihtiyaç duyulduğunda veritabanından yüklenir.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
