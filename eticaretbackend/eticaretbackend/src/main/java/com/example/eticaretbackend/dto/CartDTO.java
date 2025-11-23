package com.example.eticaretbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Cart entity’sinin frontend’e gönderilecek veri transfer nesnesi
public class CartDTO {
    private Long id;                 // Sepet ID
    private Long customerId;         // Müşteri ID
    private String customerUsername; // Müşteri kullanıcı adı
    private Long productId;          // Ürün ID
    private String productName;      // Ürün adı
    private int quantity;            // Sepetteki ürün miktarı
    private double totalPrice;       // Ürün toplam fiyatı
}
