package com.example.eticaretbackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product_review")
public class ProductReview extends BaseEntity {

    // Yorum yapan müşteri
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    // Yorum yapılan ürün
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // Yorum metni
    @Column(length = 2000, nullable = false)
    private String comment;

    // Puanlama (1-5)
    @Column(nullable = false)
    private Integer rating;

    // Yorum tarihi
    private LocalDateTime reviewDate = LocalDateTime.now();
}
