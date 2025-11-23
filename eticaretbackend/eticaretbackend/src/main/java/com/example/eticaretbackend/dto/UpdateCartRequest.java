package com.example.eticaretbackend.dto;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
// Sepetteki ürün miktarını güncellemek için kullanılan DTO
public class UpdateCartRequest {

    @Min(value = 1, message = "Miktar en az 1 olmalı")
    private Integer quantity; // Güncellenecek ürün miktarı
}
