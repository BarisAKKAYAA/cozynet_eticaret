package com.example.eticaretbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart extends BaseEntity {

    // Sepetteki ürün adedi. En az 1 olmalı.
    @Min(1)
    private Integer quantity = 1;

    // Sepeti oluşturan müşteri ile ilişki
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    // Sepete eklenen ürün ile ilişki
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    // Sepet satırının toplam fiyatı (ürün fiyatı * adet)
    private Double totalPrice;


    @PrePersist // Entity veritabanına eklenmeden hemen önce otomatik olarak çalışır.
    @PreUpdate  // Entity veritabanına güncellenmeden hemen önce otomatik olarak çalışır.
    // Toplam ücreti hesaplamak içiçn kullanılan method
    private void calculateTotalPrice() {
        if (product != null && product.getPrice() != null && quantity != null) {
            this.totalPrice = product.getPrice() * quantity;
        } else {
            this.totalPrice = 0.0;
        }
    }
}
