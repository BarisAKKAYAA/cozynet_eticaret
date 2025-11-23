package com.example.eticaretbackend.controller;

import com.example.eticaretbackend.dto.CategoryDTO;
import com.example.eticaretbackend.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173") // Frontend URL
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // Tüm kategorileri getir
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        log.info("Tüm kategoriler getiriliyor");
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    // ID ile kategori getir
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
        log.info("Kategori ID {} getiriliyor", id);
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    // Yeni kategori oluştur
    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
        log.info("Yeni kategori oluşturuluyor: {}", categoryDTO.getName());
        return ResponseEntity.ok(categoryService.createCategory(categoryDTO));
    }

    // Mevcut kategoriyi güncelle
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id,
                                                      @RequestBody CategoryDTO categoryDTO) {
        log.info("Kategori ID {} güncelleniyor", id);
        return ResponseEntity.ok(categoryService.updateCategory(id, categoryDTO));
    }

    // Kategori sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        log.info("Kategori ID {} silindi", id);
        return ResponseEntity.noContent().build();
    }
}
