package com.example.eticaretbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {

    // Ürün adı, boş bırakılamaz
    @Column(nullable = false)
    private String name;

    // Ürün kodu (SKU), benzersiz ve boş bırakılamaz
    @Column(unique = true, nullable = false)
    private String sku;

    // Ürün açıklaması, uzun metin olabilir
    @Column(length = 2000)
    private String description;

    // Ürün fiyatı, pozitif olmalı
    @Column(nullable = false)
    @Positive(message = "Price must be positive")
    private Double price;

    // Stok adedi, 0 veya daha fazla olabilir
    @Min(0)
    private Integer stock;

    // Ürün görsel URL'si (opsiyonel)
    @Column(name = "image_url")
    private String imageUrl;

    // Ürün özellikleri JSON formatında saklanabilir (opsiyonel)
    @Column(columnDefinition = "json")
    private String features;


    // Her ürünün bir kategoriye ait olduğunu belirtir ve kategori bilgisi yalnızca ihtiyaç duyulduğunda veritabanından yüklenir.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // Her ürünün birden fazla yorum/incelemesi olabileceğini belirtir ve ürün üzerinde yapılan tüm işlemler ilişkili yorumlara da otomatik uygulanır.
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductReview> reviews;


}
