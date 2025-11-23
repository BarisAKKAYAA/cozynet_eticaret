package com.example.eticaretbackend.exception;

// Kaynak bulunamadığında fırlatılan özel exception
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
