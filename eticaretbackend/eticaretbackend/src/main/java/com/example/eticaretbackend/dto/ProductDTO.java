package com.example.eticaretbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
// Product entity’sinin frontend’e gönderilecek veri transfer nesnesi (DTO)
public class ProductDTO {
    private Long id;             // Ürün ID
    private String name;         // Ürün adı
    private String description;  // Ürün Açıklaması
    private String sku;          // SKU
    private Double price;        // Fiyat
    private Integer stock;        // Stok

    @JsonProperty("image_url")
    private String imageUrl;      // Resim URL
    private Long categoryId;      // Kategori Id
    private String categoryName; // Kategori adı
    private Double avgRating;    // Ortalama puan
    private Integer reviewCount; // Review sayısı
    private Long totalSold;      // Toplam satılan miktar (popülerlik için)

    private List<FeatureDTO> features;



}

