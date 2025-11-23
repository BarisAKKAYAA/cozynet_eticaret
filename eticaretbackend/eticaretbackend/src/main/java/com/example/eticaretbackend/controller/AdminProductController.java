package com.example.eticaretbackend.controller;

import com.example.eticaretbackend.dto.ProductDTO;
import com.example.eticaretbackend.model.Product;
import com.example.eticaretbackend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminProductController {

    private final ProductService productService;

    public AdminProductController(ProductService productService) {
        this.productService = productService;
    }

    // Tüm ürünleri DTO olarak getir
    @GetMapping("/all")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProductsDTO());
    }

    // ID ile ürün getir
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(productService.convertToDTO(product));
    }

    // Yeni ürün oluştur (DTO)
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO dto) {
        Product created = productService.createProductFromDTO(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.convertToDTO(created));
    }

    // Ürün güncelle (DTO)
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto) {
        Product updated = productService.updateProductFromDTO(id, dto);
        return ResponseEntity.ok(productService.convertToDTO(updated));
    }

    // Ürün sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
