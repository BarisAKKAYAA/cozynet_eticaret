package com.example.eticaretbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
// SiteReview entity’sinin frontend’e gönderilecek veri transfer nesnesi (DTO)
public class SiteReviewDTO {
    private Long id;           // Yorum ID
    private Long customerId;   // Müşteri Id

    private String customerName; // Müşteri kullanıcı adı
    private String comment;    // Yorum içeriği
    private int rating;        // Puan
    private LocalDateTime reviewDate; // Yorum tarihi
}
