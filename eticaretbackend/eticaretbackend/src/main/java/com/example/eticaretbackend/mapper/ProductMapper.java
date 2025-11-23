package com.example.eticaretbackend.mapper;

import com.example.eticaretbackend.dto.FeatureDTO;
import com.example.eticaretbackend.dto.ProductDTO;
import com.example.eticaretbackend.model.Category;
import com.example.eticaretbackend.model.Product;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collections;
import java.util.List;

public class ProductMapper {

    // Entity → DTO
    public static ProductDTO toDTO(Product product, Long totalSold) {
        if (product == null) return null;

        // Ortalama puan ve yorum sayısı için başlangıç değerleri
        double avgRating = 0.0;
        int reviewCount = 0;

        // Reviews varsa ortalama ve sayıyı hesapla
        if (product.getReviews() != null && !product.getReviews().isEmpty()) {
            reviewCount = product.getReviews().size();
            avgRating = product.getReviews().stream()
                    .mapToInt(r -> r.getRating() != null ? r.getRating() : 0) // null-safe
                    .average()
                    .orElse(0.0);
        }

        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setSku(product.getSku());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setDescription(product.getDescription());
        dto.setImageUrl(product.getImageUrl() != null ? "/" + product.getImageUrl() : "/images/default.png");

        // Kategori bilgisi
        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }

        // Ortalama puan ve yorum sayısı
        dto.setAvgRating(avgRating);
        dto.setReviewCount(reviewCount);

        // Features JSON → List<FeatureDTO>
        if (product.getFeatures() != null && !product.getFeatures().isEmpty()) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                String json = product.getFeatures().trim();
                if (json.startsWith("[")) {
                    dto.setFeatures(mapper.readValue(json, new TypeReference<List<FeatureDTO>>() {}));
                } else if (json.startsWith("{")) {
                    FeatureDTO feature = mapper.readValue(json, FeatureDTO.class);
                    dto.setFeatures(Collections.singletonList(feature));
                } else {
                    dto.setFeatures(Collections.emptyList());
                }
            } catch (Exception e) {
                dto.setFeatures(Collections.emptyList());
            }
        } else {
            dto.setFeatures(Collections.emptyList());
        }

        return dto;
    }

    // DTO → Entity (Category Repository burada yok, sadece ID set)
    public static Product toEntity(ProductDTO dto) {
        if (dto == null) return null;

        Product product = new Product();
        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl() != null ? dto.getImageUrl().replaceFirst("^/", "") : null);

        // Sadece Category objesi oluşturuluyor, gerçek entity Service içinde set edilecek
        if (dto.getCategoryId() != null) {
            Category category = new Category();
            category.setId(dto.getCategoryId());
            product.setCategory(category);
        }

        // Features
        if (dto.getFeatures() != null && !dto.getFeatures().isEmpty()) {
            try {
                product.setFeatures(new ObjectMapper().writeValueAsString(dto.getFeatures()));
            } catch (Exception e) {
                product.setFeatures(null);
            }
        }

        return product;
    }
}


