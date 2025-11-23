package com.example.eticaretbackend.controller;

import com.example.eticaretbackend.dto.CartDTO;
import com.example.eticaretbackend.service.CartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = "http://localhost:5173")
// Cart API endpointleri
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @GetMapping("/customer/{customerId}")
    // Müşterinin sepetini getir
    public ResponseEntity<List<CartDTO>> getCustomerCart(@PathVariable Long customerId) {
        log.info("Müşteri {} sepeti getiriliyor", customerId);
        return ResponseEntity.ok(service.getCustomerCart(customerId));
    }

    @PostMapping
    // Sepete ürün ekle
    public ResponseEntity<CartDTO> addToCart(@RequestBody CartDTO dto) {
        return ResponseEntity.ok(service.addToCart(dto));
    }

    @PutMapping("/{cartId}")
    // Sepetteki ürünü güncelle
    public ResponseEntity<CartDTO> updateCartItem(@PathVariable Long cartId, @RequestBody CartDTO dto) {
        return ResponseEntity.ok(service.updateCartItem(cartId, dto));
    }

    @DeleteMapping("/{cartId}")
    // Sepetteki ürünü sil
    public ResponseEntity<Void> removeCartItem(@PathVariable Long cartId) {
        service.removeCartItem(cartId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/customer/{customerId}")
    // Müşterinin tüm sepetini temizle
    public ResponseEntity<Void> clearCustomerCart(@PathVariable Long customerId) {
        service.clearCustomerCart(customerId);
        return ResponseEntity.noContent().build();
    }
}
