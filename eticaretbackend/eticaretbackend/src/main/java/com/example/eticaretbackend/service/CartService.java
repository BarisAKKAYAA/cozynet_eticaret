package com.example.eticaretbackend.service;

import com.example.eticaretbackend.dto.CartDTO;
import com.example.eticaretbackend.exception.BadRequestException;
import com.example.eticaretbackend.exception.ResourceNotFoundException;
import com.example.eticaretbackend.mapper.CartMapper;
import com.example.eticaretbackend.model.Cart;
import com.example.eticaretbackend.model.Customer;
import com.example.eticaretbackend.model.Product;
import com.example.eticaretbackend.repository.CartRepository;
import com.example.eticaretbackend.repository.CustomerRepository;
import com.example.eticaretbackend.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
// CartService, sepetlerim tüm iş mantığını yönetir.
public class CartService {

    private final CartRepository cartRepository;           // Cart repository
    private final CustomerRepository customerRepository;   // Customer repository
    private final ProductRepository productRepository;     // Product repository
    private final CartMapper cartMapper;                   // Cart mapper

    public CartService(CartRepository cartRepository,
                       CustomerRepository customerRepository,
                       ProductRepository productRepository,
                       CartMapper cartMapper) {
        this.cartRepository = cartRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.cartMapper = cartMapper;
    }

    @Transactional // İşlem sırasında veri tutarlılığı için
    public CartDTO addToCart(CartDTO dto) {
        Customer customer = customerRepository.findById(dto.getCustomerId()) // Müşteri var mı kontrol
                .orElseThrow(() -> new ResourceNotFoundException("Müşteri bulunamadı"));

        Product product = productRepository.findById(dto.getProductId()) // Ürün var mı kontrol
                .orElseThrow(() -> new ResourceNotFoundException("Ürün bulunamadı"));

        if (dto.getQuantity() <= 0) throw new BadRequestException("Ürün miktarı 1 veya daha fazla olmalıdır"); // Miktar kontrol

        Optional<Cart> existingCartOpt = cartRepository.findByCustomerIdAndProductId(
                dto.getCustomerId(), dto.getProductId()
        ); // Sepette aynı ürün var mı kontrol

        Cart savedCart;

        if (existingCartOpt.isPresent()) { // Sepette ürün varsa
            Cart existingCart = existingCartOpt.get(); // Mevcut cart objesini al
            existingCart.setQuantity(existingCart.getQuantity() + dto.getQuantity()); // Miktarı artır
            savedCart = cartRepository.save(existingCart); // Güncellenmiş cart'ı kaydet
            log.info("Müşteri {} mevcut üründen miktar artırdı: {} (yeni adet: {})",
                    customer.getId(), product.getName(), existingCart.getQuantity());
        } else { // Sepette yoksa
            Cart cart = cartMapper.toEntity(dto); // DTO → Entity
            cart.setCustomer(customer); // Müşteri set
            cart.setProduct(product);   // Ürün set
            savedCart = cartRepository.save(cart); // Kaydet
            log.info("Müşteri {} sepete yeni ürün ekledi: {} ({} adet)",
                    customer.getId(), product.getName(), dto.getQuantity());
        }

        return cartMapper.toDTO(savedCart); // Entity → DTO dönüşümü ve dönüş
    }


    @Transactional(readOnly = true)
    // Müşterinin tüm sepet ürünlerini getir
    public List<CartDTO> getCustomerCart(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Müşteri bulunamadı")); // Müşteri kontrol

        List<CartDTO> cartDTOs = cartMapper.toDTOList(cartRepository.findByCustomer(customer)); // DTO listesi
        log.info("Müşteri {} sepetindeki ürünler getirildi ({} ürün)", customerId, cartDTOs.size());

        return cartDTOs; // Liste döndür
    }


    @Transactional
    // Sepetteki tek ürünü sil
    public void removeCartItem(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Sepet ürünü bulunamadı")); // Ürün kontrol
        cartRepository.delete(cart); // Sil
        log.info("Sepet ürünü silindi: ID {}", cartId);
    }


    @Transactional
    // Sepetteki ürünü güncelle (quantity, customer, product)
    public CartDTO updateCartItem(Long cartId, CartDTO dto) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Sepet ürünü bulunamadı")); // Ürün kontrol

        cartMapper.updateEntity(cart, dto);         // Mapper ile güncelle
        Cart updatedCart = cartRepository.save(cart); // Kaydet

        log.info("Sepet ürünü güncellendi: ID {} -> yeni miktar {}", cartId, dto.getQuantity());
        return cartMapper.toDTO(updatedCart);      // DTO döndür
    }

    @Transactional
    // Müşterinin tüm sepetini temizle
    public void clearCustomerCart(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Müşteri bulunamadı")); // Müşteri kontrol

        List<Cart> carts = cartRepository.findByCustomer(customer); // Sepetteki ürünleri al
        if (!carts.isEmpty()) {
            cartRepository.deleteAll(carts); // Tümünü sil
            log.info("Müşteri {} sepeti temizlendi ({} ürün)", customerId, carts.size());
        }
    }
}
