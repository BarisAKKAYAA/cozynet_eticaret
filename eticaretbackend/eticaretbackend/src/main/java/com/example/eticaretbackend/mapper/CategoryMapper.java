package com.example.eticaretbackend.mapper;

import com.example.eticaretbackend.dto.CategoryDTO;
import com.example.eticaretbackend.model.Category;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class CategoryMapper {

    // Entity → DTO dönüşümü
    public static CategoryDTO toDTO(Category category) {
        return Optional.ofNullable(category)
                .map(c -> {
                    CategoryDTO dto = new CategoryDTO();
                    dto.setId(c.getId());
                    dto.setName(c.getName());
                    dto.setDescription(c.getDescription());
                    dto.setImageUrl(c.getImageUrl());
                    return dto;
                })
                .orElse(null);
    }

    // DTO → Entity dönüşümü
    public static Category toEntity(CategoryDTO dto) {
        return Optional.ofNullable(dto)
                .map(d -> {
                    Category category = new Category();
                    category.setId(d.getId());
                    category.setName(d.getName());
                    category.setDescription(d.getDescription());
                    category.setImageUrl(d.getImageUrl());
                    return category;
                })
                .orElse(null);
    }

    // Entity list → DTO list dönüşümü
    public static List<CategoryDTO> toDTOList(List<Category> categories) {
        return Optional.ofNullable(categories)
                .orElse(List.of())
                .stream()
                .map(CategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Mevcut entity'yi DTO ile güncelle
    public static void updateEntity(Category category, CategoryDTO dto) {
        if (category == null || dto == null) return;

        // DTO'daki değerler null değilse entity'yi güncelle
        if (dto.getName() != null) category.setName(dto.getName());
        if (dto.getDescription() != null) category.setDescription(dto.getDescription());
        if (dto.getImageUrl() != null) category.setImageUrl(dto.getImageUrl());
    }
}
