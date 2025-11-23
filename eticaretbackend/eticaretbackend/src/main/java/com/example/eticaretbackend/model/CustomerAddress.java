package com.example.eticaretbackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "customer_address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔹 Hangi müşteriye ait
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    // 🔹 Adres tipi: SHIPPING veya BILLING
    @Enumerated(EnumType.STRING)
    @Column(name = "address_type", nullable = false)
    private AddressType addressType;

    // 🔹 Adres detayları
    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "billing_address")
    private String billingAddress;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "postal_code")
    private String postalCode;

    // 🔹 Şirket bilgileri (BILLING adresi için)
    @Column(name = "company_name")
    private String companyName;

    @Column(name = "tax_number")
    private String taxNumber;

    @Column(name = "tax_office")
    private String taxOffice;

    @Column(name = "created_up")
    private LocalDateTime createdUp = LocalDateTime.now();

    @Column(name = "update_up")
    private LocalDateTime updateUp = LocalDateTime.now();

    @PreUpdate
    public void onUpdate() {
        this.updateUp = LocalDateTime.now();
    }

    public enum AddressType {
        SHIPPING, BILLING
    }
}
