package com.example.eticaretbackend.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;                            // Sipariş ID
    private Long customerId;                    // Müşteri ID
    private String customerUsername;            // Müşteri kullanıcı adı
    private Double totalPrice;                  // Toplam fiyat
    private String status;                      // Sipariş durumu
    private String statusDisplay;               // Sipariş durumu Görüntüsü
    private LocalDateTime createdAt;            // Oluşturulma tarihi

    // 🔹 Adres bilgileri
    private CustomerAddressDTO shippingAddress; // Teslimat adresi
    private CustomerAddressDTO billingAddress;  // Fatura adresi

    // 🔹 Sipariş ürünleri listesi
    private List<OrderItemDTO> items;           // Sipariş ürünleri
}