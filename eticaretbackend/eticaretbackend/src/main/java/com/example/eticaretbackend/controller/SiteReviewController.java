package com.example.eticaretbackend.controller;

import com.example.eticaretbackend.dto.SiteReviewDTO;
import com.example.eticaretbackend.model.SiteReview;
import com.example.eticaretbackend.service.SiteReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sitereviews")
@CrossOrigin(origins = "http://localhost:5173")
public class SiteReviewController {

    private final SiteReviewService reviewService;

    public SiteReviewController(SiteReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Tüm site yorumlarını getir
    @GetMapping
    public ResponseEntity<List<SiteReviewDTO>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews()); // DTO listesi
    }

    // Yeni site yorumu oluştur
    @PostMapping("/customer/{customerId}")
    public ResponseEntity<SiteReviewDTO> createReview(
            @PathVariable Long customerId,
            @RequestBody SiteReview review) {
        return ResponseEntity.ok(reviewService.createReview(customerId, review)); // DTO döndür
    }




}
