package com.example.eticaretbackend.mapper;

import com.example.eticaretbackend.dto.ProductReviewDTO;
import com.example.eticaretbackend.model.ProductReview;

/**
 * ProductReview Entity ↔ DTO dönüşüm işlemleri
 */
public class ProductReviewMapper {

    // ProductReview entity → DTO dönüşümü
    public static ProductReviewDTO toDTO(ProductReview review) {
        if (review == null) return null; // null kontrol

        return new ProductReviewDTO(
                review.getId(),                        // review ID
                review.getCustomer().getId(),          // müşteri ID
                review.getCustomer().getUsername(),    // müşteri kullanıcı adı
                review.getProduct().getId(),           // ürün ID
                review.getProduct().getName(),         // ürün adı
                review.getComment(),                   // yorum
                review.getRating(),                    // puan
                review.getReviewDate()                 // tarih
        );
    }
}
