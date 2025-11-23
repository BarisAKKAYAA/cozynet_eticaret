package com.example.eticaretbackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// Tüm projedeki exceptionları merkezi olarak yöneten sınıf
@RestControllerAdvice
public class GlobalExceptionHandler {

  // Kaynak bulunamadığında 404 NOT FOUND döndürür
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<String> handleNotFound(ResourceNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  // Geçersiz isteklerde 400 BAD REQUEST döndürür
  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<String> handleBadRequest(BadRequestException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
  }

  // Diğer tüm beklenmeyen hatalarda 500 INTERNAL SERVER ERROR döndürür
  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleOtherExceptions(Exception ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Beklenmeyen bir hata oluştu: " + ex.getMessage());
  }
}

