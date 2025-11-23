package com.example.eticaretbackend.controller;

import com.example.eticaretbackend.dto.OrderDTO;
import com.example.eticaretbackend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    // 🔹 1. Müşteri DTO'sundan sipariş oluştur
    @PostMapping("/customer/{customerId}")
    public ResponseEntity<OrderDTO> createOrderFromDTO(
            @PathVariable Long customerId,
            @RequestBody OrderDTO orderDTO) {

        OrderDTO createdOrder = orderService.createOrderFromDTO(customerId, orderDTO);
        return ResponseEntity.ok(createdOrder);
    }

    // 🔹 2. Belirli müşterinin tüm siparişlerini getir
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByCustomer(@PathVariable Long customerId) {
        List<OrderDTO> orders = orderService.getOrdersByCustomer(customerId);
        return ResponseEntity.ok(orders);
    }



}
