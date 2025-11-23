package com.example.eticaretbackend.repository;

import com.example.eticaretbackend.model.Product;
import com.example.eticaretbackend.model.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {

    // Belirli bir ürüne ait yorumları getir
    List<ProductReview> findByProduct(Product product);

    // Belirli bir ürünün yorum sayısını getir
    Long countByProduct(Product product);
}
