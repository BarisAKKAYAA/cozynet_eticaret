package com.example.eticaretbackend.controller;

import com.example.eticaretbackend.dto.SiteReviewDTO;
import com.example.eticaretbackend.service.SiteReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/admin/sitereviews")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminSiteReviewsController {

    private final SiteReviewService reviewService;

    public AdminSiteReviewsController (SiteReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Tüm site yorumlarını getir
    @GetMapping
    public ResponseEntity<List<SiteReviewDTO>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews()); // DTO listesi
    }
    // Site yorumunu sil
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId); // sil
        return ResponseEntity.noContent().build(); // boş yanıt
    }
}
