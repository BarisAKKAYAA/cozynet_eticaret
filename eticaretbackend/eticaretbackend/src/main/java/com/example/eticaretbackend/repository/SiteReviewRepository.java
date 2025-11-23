package com.example.eticaretbackend.repository;

import com.example.eticaretbackend.model.SiteReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SiteReviewRepository extends JpaRepository<SiteReview, Long> {
    List<SiteReview> findAll();
}