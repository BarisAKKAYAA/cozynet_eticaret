package com.example.eticaretbackend.service;

import com.example.eticaretbackend.dto.CategoryDTO;
import com.example.eticaretbackend.exception.ResourceNotFoundException;
import com.example.eticaretbackend.mapper.CategoryMapper;
import com.example.eticaretbackend.model.Category;
import com.example.eticaretbackend.repository.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;




// CategoryService, kategorilerin tüm iş mantığını yönetir.

@Slf4j
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Tüm kategorileri DTO ile getir
    @Transactional(readOnly = true)
    public List<CategoryDTO> getAllCategories() {
        List<CategoryDTO> dtos = CategoryMapper.toDTOList(categoryRepository.findAll());
        log.info("{} kategori getirildi", dtos.size());
        return dtos;
    }

    // ID ile kategori bul ve DTO döndür
    @Transactional(readOnly = true)
    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori bulunamadı: " + id));
        return CategoryMapper.toDTO(category);
    }

    // Yeni kategori oluştur
    @Transactional
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = CategoryMapper.toEntity(categoryDTO);
        Category saved = categoryRepository.save(category);
        log.info("Yeni kategori oluşturuldu: {}", saved.getName());
        return CategoryMapper.toDTO(saved);
    }










    // Mevcut kategoriyi güncelle (mapper tabanlı)
    @Transactional
    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori bulunamadı: " + id));

        // Mapper üzerinden güncelleme
        CategoryMapper.updateEntity(existing, categoryDTO);

        Category updated = categoryRepository.save(existing);
        log.info("Kategori güncellendi: {}", updated.getName());
        return CategoryMapper.toDTO(updated);
    }

    // Kategori sil
    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori bulunamadı: " + id));
        categoryRepository.delete(category);
        log.info("Kategori silindi: {}", category.getName());
    }
}
