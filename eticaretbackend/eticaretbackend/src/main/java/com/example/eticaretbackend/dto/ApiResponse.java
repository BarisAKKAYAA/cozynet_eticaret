package com.example.eticaretbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// API’den dönen standart yanıt yapısı
public class ApiResponse<T> {
    private boolean success; // İşlem başarılı mı
    private String message;  // Kullanıcıya dönülecek mesaj
    private T data;          // Dönen veri
}
