package com.example.eticaretbackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer extends BaseEntity {

    // Kullanıcı adı, boş bırakılamaz ve benzersiz olmalı
    @Column(nullable = false, unique = true)
    private String username;

    // Email, boş bırakılamaz ve benzersiz olmalı
    @Column(nullable = false, unique = true)
    private String email;

    // Şifre, boş bırakılamaz
    @Column(nullable = false)
    private String password;

    // Kullanıcının rolü (USER veya ADMIN), varsayılan USER
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    // Opsiyonel alanlar
    private String firstName;
    private String lastName;
    private String phone;



    // Kullanıcının doğrulanıp doğrulanmadığı
    private Boolean isVerified = false;


    // Bir müşterinin birden fazla adresi olabileceğini belirtir (müşteri–adres ilişkisi).
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomerAddress> addresses = new ArrayList<>();

    // Bir müşterinin birden fazla sepeti olabileceğini belirtir ve müşteri kaydedildiğinde ilişkili sepetler de otomatik olarak kaydedilir.
    // Customize Toolbar => Müşteri kaydedildiğinde ilişkili varlıklar da otomatik olarak kaydedilir, ancak silme ve güncelleme işlemleri uygulanmaz.
    @OneToMany(mappedBy = "customer", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<Cart> carts;

    // Bir müşterinin birden fazla siparişi olabileceğini belirtir ve müşteri üzerinde yapılan tüm işlemler ilişkili siparişlere de otomatik uygulanır.
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;
}
