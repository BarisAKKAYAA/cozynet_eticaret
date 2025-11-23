package com.example.eticaretbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
// ProductReview entity’sinin frontend’e gönderilecek veri transfer nesnesi (DTO)
public class ProductReviewDTO {
    private Long id;             // Yorum ID
    private Long customerId;     // Müşteri ID
    private String customerName; // Müşteri kullanıcı adı
    private Long productId;      // Ürün ID
    private String productName;  // Ürün adı
    private String comment;      // Yorum içeriği
    private Integer rating;      // Puan (1-5)
    private LocalDateTime reviewDate; // Yorum tarihi
}
