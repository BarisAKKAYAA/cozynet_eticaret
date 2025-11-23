package com.example.eticaretbackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "site_review")
public class SiteReview extends BaseEntity {

    // Yorum yapan müşteri (opsiyonel: misafir yorumları desteklenebilir)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    // Yorum metni
    @Column(length = 2000, nullable = false)
    private String comment;

    // Puanlama (1-5)
    @Column(nullable = false)
    private Integer rating;

    // Yorum tarihi
    private LocalDateTime reviewDate = LocalDateTime.now();
}
