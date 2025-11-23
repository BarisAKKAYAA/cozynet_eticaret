package com.example.eticaretbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@MappedSuperclass // JPA (Java Persistence API) anotasyonudur ve kalıtım (inheritance) yapısında ortak alanları bir üst sınıfta tanımlayıp, alt sınıflara aktarmak için kullanılır.
@Getter
@Setter
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt; // Oluşturulma zamanı

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt; // Her güncellemede otomatik yenilenir
}

