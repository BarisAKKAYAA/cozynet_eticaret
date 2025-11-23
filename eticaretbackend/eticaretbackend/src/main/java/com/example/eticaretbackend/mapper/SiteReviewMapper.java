package com.example.eticaretbackend.mapper;

import com.example.eticaretbackend.dto.SiteReviewDTO;
import com.example.eticaretbackend.model.SiteReview;

/**
 * SiteReview Entity ↔ DTO dönüşüm işlemleri
 */
public class SiteReviewMapper {

    // SiteReview entity → DTO dönüşümü
    public static SiteReviewDTO toDTO(SiteReview review) {
        if (review == null) return null; // null kontrol

        return new SiteReviewDTO(
                review.getId(),                                                // yorum ID
                review.getCustomer() != null ? review.getCustomer().getId() : null,      // müşteri ID
                review.getCustomer() != null ? review.getCustomer().getUsername() : null, // müşteri kullanıcı adı
                review.getComment(),                                           // yorum
                review.getRating(),                                            // puan
                review.getReviewDate()                                         // tarih
        );
    }
}
