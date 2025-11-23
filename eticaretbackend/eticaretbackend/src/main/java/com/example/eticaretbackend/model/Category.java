package com.example.eticaretbackend.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category extends BaseEntity {

    // Kategori adı, boş bırakılamaz
    @Column(nullable = false)
    private String name;

    // Kategori açıklaması (opsiyonel)
    private String description;

    // Kategori resmi URL'si (opsiyonel)
    private String imageUrl;


    // Bir kategorinin birden çok ürünü olabileceğini belirtir (kategori–ürün ilişkisi).
    // cascade = CascadeType.ALL => Kategori üzerinde yapılan tüm işlemler (ekleme, silme, güncelleme) ilişkili ürünlere de otomatik uygulanır.
    // fetch = FetchType.LAZY=> İlişkili ürünler veritabanından sadece ihtiyaç duyulduğunda (istek geldiğinde) yüklenir.
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Product> products;
}
