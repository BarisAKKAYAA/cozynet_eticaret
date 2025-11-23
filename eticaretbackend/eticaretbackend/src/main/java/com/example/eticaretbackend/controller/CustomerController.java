package com.example.eticaretbackend.controller;

import com.example.eticaretbackend.dto.CustomerDTO;
import com.example.eticaretbackend.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


    // Kayıt (Register)
    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody CustomerDTO dto) {
        try {
            CustomerDTO saved = customerService.createCustomer(dto);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Sunucu hatası!");
        }
    }

    // Yeni müşteri oluştur
    @PostMapping
    public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO dto) {
        return ResponseEntity.ok(customerService.createCustomer(dto));
    }


    // Müşteri güncelle
    @PutMapping("/{id}")
    public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO dto) {
        return ResponseEntity.ok(customerService.updateCustomer(id, dto));
    }



    // Giriş (Login)
    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody CustomerDTO dto) {
        try {
            // Kullanıcıyı username ile bul
            CustomerDTO customer = customerService.findByUsername(dto.getUsername());
            if (customer != null && customerService.authenticate(dto.getUsername(), dto.getPassword())) {
                // Başarılı → tüm bilgileri dön
                return ResponseEntity.ok(customer); // id, username, email, phone, address
            } else {
                return ResponseEntity.status(401).body("Kullanıcı adı veya şifre yanlış");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Sunucu hatası!");
        }
    }



}

