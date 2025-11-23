package com.example.eticaretbackend.mapper;

import com.example.eticaretbackend.dto.CartDTO;
import com.example.eticaretbackend.exception.ResourceNotFoundException;
import com.example.eticaretbackend.model.Cart;
import com.example.eticaretbackend.model.Customer;
import com.example.eticaretbackend.model.Product;
import com.example.eticaretbackend.repository.CustomerRepository;
import com.example.eticaretbackend.repository.ProductRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
// Cart ↔ CartDTO dönüşümleri
public class CartMapper {

    private final CustomerRepository customerRepository; // Customer repository
    private final ProductRepository productRepository;   // Product repository

    public CartMapper(CustomerRepository customerRepository, ProductRepository productRepository) {
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    // Entity → DTO
    public CartDTO toDTO(Cart cart) {
        return Optional.ofNullable(cart)
                .filter(c -> c.getCustomer() != null && c.getProduct() != null) // Customer ve Product null değilse
                .map(c -> new CartDTO(
                        c.getId(),
                        c.getCustomer().getId(),
                        c.getCustomer().getUsername(),
                        c.getProduct().getId(),
                        c.getProduct().getName(),
                        c.getQuantity(),
                        c.getQuantity() * c.getProduct().getPrice()
                ))
                .orElse(null); // Null ise null döndür
    }

    // Liste dönüşümü: List<Cart> → List<CartDTO>
    public List<CartDTO> toDTOList(List<Cart> carts) {
        return Optional.ofNullable(carts)
                .orElse(List.of()) // Null gelirse boş liste
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // DTO → Entity
    public Cart toEntity(CartDTO dto) {
        if (dto == null) return null;

        Cart cart = new Cart();

        if (dto.getCustomerId() != null) {
            Customer customer = customerRepository.findById(dto.getCustomerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Customer bulunamadı: " + dto.getCustomerId()));
            cart.setCustomer(customer);
        }

        if (dto.getProductId() != null) {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product bulunamadı: " + dto.getProductId()));
            cart.setProduct(product);
        }

        cart.setQuantity(dto.getQuantity());
        return cart;
    }

    // Mevcut entity güncelle
    public void updateEntity(Cart cart, CartDTO dto) {
        if (dto.getQuantity() != 0) cart.setQuantity(dto.getQuantity()); // Quantity güncelle

        if (dto.getCustomerId() != null) {
            Customer customer = customerRepository.findById(dto.getCustomerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Customer bulunamadı: " + dto.getCustomerId()));
            cart.setCustomer(customer); // Customer güncelle
        }

        if (dto.getProductId() != null) {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product bulunamadı: " + dto.getProductId()));
            cart.setProduct(product); // Product güncelle
        }
    }
}
