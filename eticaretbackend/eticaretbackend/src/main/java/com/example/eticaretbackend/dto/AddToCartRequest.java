package com.example.eticaretbackend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
// Frontend’den gelen sepete ekleme isteğini temsil eder
public class AddToCartRequest {

    @NotNull(message = "Müşteri seçimi yapmalısınız")
    private Long customerId; // Sepete ürün ekleyecek müşteri ID

    @NotNull(message = "Ürün seçimi yapmalısınız")
    private Long productId;  // Sepete eklenecek ürün ID

    @Min(value = 1, message = "Miktar en az 1 olmalı")
    private int quantity;    // Sepete eklenecek ürün miktarı
}
