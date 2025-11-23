package com.example.eticaretbackend.service;

import com.example.eticaretbackend.dto.SiteReviewDTO;
import com.example.eticaretbackend.exception.ResourceNotFoundException;
import com.example.eticaretbackend.mapper.SiteReviewMapper;
import com.example.eticaretbackend.model.Customer;
import com.example.eticaretbackend.model.SiteReview;
import com.example.eticaretbackend.repository.CustomerRepository;
import com.example.eticaretbackend.repository.SiteReviewRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

// SiteReviewService, site yorumlarının tüm iş mantığını yönetir.
@Slf4j
@Service
public class SiteReviewService {

    private final SiteReviewRepository reviewRepository;
    private final CustomerRepository customerRepository;

    public SiteReviewService(SiteReviewRepository reviewRepository,
                             CustomerRepository customerRepository) {
        this.reviewRepository = reviewRepository;
        this.customerRepository = customerRepository;
    }

    // Yeni site yorumu oluştur
    @Transactional
    public SiteReviewDTO createReview(Long customerId, SiteReview review) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Müşteri bulunamadı: " + customerId)); // müşteri kontrol

        review.setCustomer(customer); // müşteri set et
        SiteReview saved = reviewRepository.save(review); // kaydet
        log.info("Yeni site yorumu oluşturuldu: ID {}", saved.getId());
        return SiteReviewMapper.toDTO(saved); // DTO döndür
    }

    // Tüm site yorumlarını getir
    @Transactional(readOnly = true)
    public List<SiteReviewDTO> getAllReviews() {
        return reviewRepository.findAll()
                .stream()
                .map(SiteReviewMapper::toDTO) // entity → DTO
                .collect(Collectors.toList());
    }

    // Site yorumu sil
    @Transactional
    public void deleteReview(Long reviewId) {
        SiteReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Yorum bulunamadı: " + reviewId)); // null kontrol
        reviewRepository.delete(review); // sil
        log.info("Site yorumu silindi: ID {}", reviewId);
    }
}
