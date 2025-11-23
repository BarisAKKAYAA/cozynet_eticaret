package com.example.eticaretbackend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDTO {

    private Long id;           // Sipariş kaleminin ID'si
    private Long productId;    // Ürün ID'si
    private String productName;// Ürün adı
    private Integer quantity;  // Adet
    private Double price;      // Fiyat
}
