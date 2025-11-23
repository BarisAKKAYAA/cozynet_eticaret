package com.example.eticaretbackend.service;

import com.example.eticaretbackend.dto.ProductDTO;
import com.example.eticaretbackend.exception.ResourceNotFoundException;
import com.example.eticaretbackend.mapper.ProductMapper;
import com.example.eticaretbackend.model.Category;
import com.example.eticaretbackend.model.Product;
import com.example.eticaretbackend.repository.CategoryRepository;
import com.example.eticaretbackend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    // Tüm ürünleri getir (DTO olarak)
    public List<ProductDTO> getAllProductsDTO() {
        return productRepository.findAllWithCategoryAndReviews().stream()
                .map(p -> ProductMapper.toDTO(p, null))
                .collect(Collectors.toList());
    }

    // ID ile ürün getir
    public Product getProductById(Long id) {
        return productRepository.findByIdWithCategoryAndReviews(id);
    }

    // YENİ ÜRÜN OLUŞTUR (DTO --> Entity)
    public Product createProductFromDTO(ProductDTO dto) {
        Product product = ProductMapper.toEntity(dto);

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Kategori bulunamadı"));
            product.setCategory(category);
        }

        return productRepository.save(product);
    }

    // Ürün güncelle (DTO --> Entity)
    public Product updateProductFromDTO(Long id, ProductDTO dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ürün bulunamadı"));

        Product updated = ProductMapper.toEntity(dto);
        updated.setId(id);

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Kategori bulunamadı"));
            updated.setCategory(category);
        }

        return productRepository.save(updated);
    }


    // Ürün sil
    public void deleteProduct(Long id) {
        Product existing = getProductById(id);
        productRepository.delete(existing);
        log.info("Ürün silindi: {}", existing.getName());
    }

    // Filtrelenmiş ürünleri sayfalı olarak getir
    public Page<ProductDTO> getFilteredProducts(Long categoryId,
                                                String name,
                                                Double minPrice,
                                                Double maxPrice,
                                                int page,
                                                int size,
                                                boolean sortByPopularity) {

        if (page < 0) page = 0;
        if (size <= 0) size = 10;
        Pageable pageable = PageRequest.of(page, size);

        // Popüler ürünler
        if (sortByPopularity) {
            Page<ProductRepository.ProductSalesTuple> popularPage = productRepository.findPopularProducts(pageable);
            List<ProductDTO> dtos = popularPage.stream()
                    .map(tuple -> ProductMapper.toDTO(tuple.getProduct(), tuple.getTotalSold()))
                    .collect(Collectors.toList());
            return new PageImpl<>(dtos, pageable, popularPage.getTotalElements());
        }

        Page<Product> productsPage;

        if (categoryId != null) {
            List<Product> products = productRepository.findByCategoryIdWithReviews(categoryId);
            productsPage = new PageImpl<>(products, pageable, products.size());
        } else if (name != null && !name.isEmpty()) {
            productsPage = productRepository.findByNameContainingIgnoreCase(name, pageable);
        } else {
            List<Product> products = productRepository.findAllWithCategoryAndReviews();
            productsPage = new PageImpl<>(products, pageable, products.size());
        }

        List<ProductDTO> filtered = productsPage.stream()
                .filter(p -> (minPrice == null || p.getPrice() >= minPrice) &&
                        (maxPrice == null || p.getPrice() <= maxPrice))
                .map(p -> ProductMapper.toDTO(p, null))
                .collect(Collectors.toList());

        return new PageImpl<>(filtered, pageable, filtered.size());
    }

    // Kategoriye göre ürünleri getir
    @Transactional
    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        List<Product> products = productRepository.findByCategoryIdWithReviews(categoryId);
        return products.stream()
                .map(p -> ProductMapper.toDTO(p, null))
                .toList();
    }

    // Tek ürün için DTO dönüşümü
    public ProductDTO convertToDTO(Product product) {
        return ProductMapper.toDTO(product, null);
    }
}
