package com.example.eticaretbackend.service;

import com.example.eticaretbackend.dto.ProductReviewDTO;
import com.example.eticaretbackend.exception.ResourceNotFoundException;
import com.example.eticaretbackend.mapper.ProductReviewMapper;
import com.example.eticaretbackend.model.Customer;
import com.example.eticaretbackend.model.Product;
import com.example.eticaretbackend.model.ProductReview;
import com.example.eticaretbackend.repository.CustomerRepository;
import com.example.eticaretbackend.repository.ProductRepository;
import com.example.eticaretbackend.repository.ProductReviewRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

// ProductReviewService, ürün yorumlarının tüm iş mantığını yönetir.
@Slf4j
@Service
public class ProductReviewService {

    private final ProductReviewRepository reviewRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public ProductReviewService(ProductReviewRepository reviewRepository,
                                CustomerRepository customerRepository,
                                ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    // Yeni yorum oluştur
    @Transactional
    public ProductReviewDTO createReview(Long customerId, Long productId, ProductReview review) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Müşteri bulunamadı: " + customerId)); // müşteri kontrol

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Ürün bulunamadı: " + productId)); // ürün kontrol

        review.setCustomer(customer); // müşteri set et
        review.setProduct(product);   // ürün set et

        ProductReview saved = reviewRepository.save(review); // kaydet
        log.info("Yeni yorum oluşturuldu: ID {}", saved.getId());
        return ProductReviewMapper.toDTO(saved); // DTO döndür
    }

    // Ürün için tüm yorumları getir
    @Transactional(readOnly = true)
    public List<ProductReviewDTO> getReviewsByProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Ürün bulunamadı: " + productId)); // ürün kontrol

        return reviewRepository.findByProduct(product)
                .stream()
                .map(ProductReviewMapper::toDTO) // entity → DTO
                .collect(Collectors.toList());
    }

    // Yorum sil
    @Transactional
    public void deleteReview(Long reviewId) {
        ProductReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Yorum bulunamadı: " + reviewId)); // null kontrol
        reviewRepository.delete(review); // sil
        log.info("Yorum silindi: ID {}", reviewId);
    }
}
