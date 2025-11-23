package com.example.eticaretbackend.service;

import com.example.eticaretbackend.dto.CustomerAddressDTO;
import com.example.eticaretbackend.dto.OrderDTO;
import com.example.eticaretbackend.dto.OrderItemDTO;
import com.example.eticaretbackend.exception.ResourceNotFoundException;
import com.example.eticaretbackend.mapper.OrderMapper;
import com.example.eticaretbackend.model.*;
import com.example.eticaretbackend.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final CustomerAddressRepository addressRepository;

    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        CustomerRepository customerRepository,
                        ProductRepository productRepository,
                        CustomerAddressRepository addressRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.addressRepository = addressRepository;
    }

    // 🔹 Sipariş oluşturma
    @Transactional
    public OrderDTO createOrderFromDTO(Long customerId, OrderDTO dto) {
        // Müşteri bulunur
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Müşteri bulunamadı"));

        // Teslimat adresi kaydedilir
        // Teslimat ve fatura adresi aynı olacak şekilde tek kayıt
        CustomerAddressDTO addressDTO = dto.getShippingAddress(); // Frontend’den tek adres geliyor

        CustomerAddress address = new CustomerAddress();
        address.setCustomer(customer);
        address.setAddressType(addressDTO.getAddressType().equals("BILLING") ?
                CustomerAddress.AddressType.BILLING :
                CustomerAddress.AddressType.SHIPPING);
        address.setShippingAddress(addressDTO.getShippingAddress());
        address.setBillingAddress(addressDTO.getBillingAddress());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setPostalCode(addressDTO.getPostalCode());
        address.setCompanyName(addressDTO.getCompanyName());
        address.setTaxNumber(addressDTO.getTaxNumber());
        address.setTaxOffice(addressDTO.getTaxOffice());

        addressRepository.save(address);

// Siparişi oluştururken hem shipping hem billing aynı adresi kullan
        Order order = new Order();
        order.setCustomer(customer);
        order.setShippingAddress(address);
        order.setBillingAddress(address); // Tek kayıt kullanılıyor
        order.setStatus(OrderStatus.PENDING);
        order.setTotalPrice(0.0);
        order = orderRepository.save(order);



        // Sipariş kalemleri eklenir
        double totalPrice = 0;
        for (OrderItemDTO itemDTO : dto.getItems()) {
            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ürün bulunamadı: " + itemDTO.getProductId()));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemDTO.getQuantity());
            item.setPrice(itemDTO.getPrice());
            orderItemRepository.save(item);

            totalPrice += item.getPrice() * item.getQuantity();
        }

        // Toplam fiyat güncellenir ve sipariş onaylanır
        order.setTotalPrice(totalPrice);
        order.setStatus(OrderStatus.CONFIRMED);
        order = orderRepository.save(order);

        // DTO olarak geri döndürülür
        return OrderMapper.toDTO(order);
    }


    // 🔹 Müşterinin tüm siparişleri
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByCustomer(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Müşteri bulunamadı: " + customerId));

        return orderRepository.findByCustomer(customer)
                .stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    // 🔹 Tüm siparişleri DTO olarak getir
    @Transactional(readOnly = true)  // Transaction açık, Lazy load çalışabilir
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    // 🔹 ID’ye göre tek sipariş getir
    @Transactional(readOnly = true)
    public OrderDTO getOrderById(Long id) {
        return orderRepository.findById(id)
                .map(OrderMapper::toDTO)
                .orElse(null);
    }

    @Transactional
    public OrderDTO updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order bulunamadı"));

        // Enum’a çevir
        order.setStatus(OrderStatus.valueOf(status));

        // DTO’ya çevirirken Lazy yüklemeyi önle
        Customer customer = order.getCustomer(); // session açıkken yükle
        CustomerAddress shipping = order.getShippingAddress();
        CustomerAddress billing = order.getBillingAddress();
        List<OrderItem> items = order.getOrderItems();

        return OrderMapper.toDTO(order);
    }


}
