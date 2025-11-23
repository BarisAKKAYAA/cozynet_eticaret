package com.example.eticaretbackend.repository;

import com.example.eticaretbackend.model.Category;
import com.example.eticaretbackend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Belirli kategoriye ait ürünleri ve yorumlarını join fetch ile getir
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.reviews WHERE p.category.id = :categoryId")
    List<Product> findByCategoryIdWithReviews(@Param("categoryId") Long categoryId);

    // ID ile ürün, kategori ve yorumları join fetch ile getir
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.category LEFT JOIN FETCH p.reviews WHERE p.id = :id")
    Product findByIdWithCategoryAndReviews(Long id);

    // Tüm ürünleri kategori ve yorumlarıyla birlikte getir
    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.category LEFT JOIN FETCH p.reviews")
    List<Product> findAllWithCategoryAndReviews();

    // Belirli kategoriye ait ürünleri sayfalı olarak getir
    Page<Product> findByCategory(Category category, Pageable pageable);

    // İsme göre ürünleri sayfalı olarak getir
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    // Popüler ürünleri toplam satılan miktara göre getir
    @Query("SELECT p as product, SUM(c.quantity) as totalSold " +
            "FROM Cart c JOIN c.product p " +
            "GROUP BY p " +
            "ORDER BY totalSold DESC")
    Page<ProductSalesTuple> findPopularProducts(Pageable pageable);

    // Ortalama puan ve yorum sayısını ürün bazında hesapla
    @Query("""
           SELECT p.id as productId, COALESCE(AVG(r.rating), 0) as avgRating, COUNT(r) as reviewCount
           FROM Product p
           LEFT JOIN p.reviews r
           GROUP BY p.id
           """)
    List<ProductRatingTuple> findAvgRatingAndReviewCount();

    // Popüler ürün query’si için tuple arayüzü
    interface ProductSalesTuple {
        Product getProduct();
        Long getTotalSold();
    }

    // Ortalama puan ve yorum sayısı için tuple arayüzü
    interface ProductRatingTuple {
        Long getProductId();
        Double getAvgRating();
        Long getReviewCount();
    }
}


