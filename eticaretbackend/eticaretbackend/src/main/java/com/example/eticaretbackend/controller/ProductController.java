package com.example.eticaretbackend.controller;

import com.example.eticaretbackend.dto.ProductDTO;
import com.example.eticaretbackend.model.Product;
import com.example.eticaretbackend.repository.ProductRepository;
import com.example.eticaretbackend.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Tüm ürünleri DTO olarak getir
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProductsDTO();
        return ResponseEntity.ok(products);
    }

    // ID ile ürün getir
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(productService.convertToDTO(product));

    }



    // Filtrelenmiş ürünleri sayfalı olarak getir
    @GetMapping("/filter")
    public ResponseEntity<Page<ProductDTO>> getFilteredProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "false") boolean sortByPopularity
    ) {
        Page<ProductDTO> filtered = productService.getFilteredProducts(categoryId, name, minPrice, maxPrice, page, size, sortByPopularity);
        return ResponseEntity.ok(filtered);
    }

    // Kategoriye göre ürünleri getir
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable Long categoryId) {
        List<ProductDTO> products = productService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(products);
    }
}
