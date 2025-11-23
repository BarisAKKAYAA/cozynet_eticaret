package com.example.eticaretbackend.controller;

import com.example.eticaretbackend.dto.ProductReviewDTO;
import com.example.eticaretbackend.model.ProductReview;
import com.example.eticaretbackend.service.ProductReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductReviewController {

    private final ProductReviewService reviewService;

    public ProductReviewController(ProductReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Yeni yorum oluştur
    @PostMapping("/customer/{customerId}/product/{productId}")
    public ResponseEntity<ProductReviewDTO> createReview(
            @PathVariable Long customerId,
            @PathVariable Long productId,
            @RequestBody ProductReview review) {
        return ResponseEntity.ok(reviewService.createReview(customerId, productId, review)); // DTO döndür
    }

    // Ürün için tüm yorumları getir
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductReviewDTO>> getReviewsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(productId)); // DTO listesi
    }


    // Yorum sil
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId); // sil
        return ResponseEntity.noContent().build(); // boş yanıt
    }
}
