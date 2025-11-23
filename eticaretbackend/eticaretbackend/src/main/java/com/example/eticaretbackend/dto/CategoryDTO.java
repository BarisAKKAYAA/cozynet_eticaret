package com.example.eticaretbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Category entity’sinin frontend’e gönderilecek veri transfer nesnesi (DTO)
public class CategoryDTO {
    private Long id; // Kategori ID
    private String name; // Kategori adı
    private String description; // Kategori açıklaması
    private String imageUrl; // Kategori görsel URL

}
