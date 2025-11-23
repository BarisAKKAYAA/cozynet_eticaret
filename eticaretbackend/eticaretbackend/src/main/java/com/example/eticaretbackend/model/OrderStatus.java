package com.example.eticaretbackend.model;


// Enum (enumeration), Java’da sabit değerlerin bir arada tutulduğu özel bir veri tipidir.
// Yani değişmeyecek sabitleri daha anlamlı ve güvenli bir şekilde tanımlamak için kullanılır.

public enum OrderStatus {
    PENDING("Beklemede"),          // Sipariş alındı, onay bekliyor
    CONFIRMED("Onaylandı"),        // Sipariş onaylandı
    SHIPPED("Kargoya Verildi"),    // Sipariş kargoya verildi
    DELIVERED("Teslim Edildi"),    // Müşteriye teslim edildi
    CANCELLED("İptal Edildi"),     // Sipariş iptal edildi
    RETURNED("İade Edildi");       // Müşteri tarafından iade edildi

    private final String displayName;

    OrderStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

