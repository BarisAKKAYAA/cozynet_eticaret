package com.example.eticaretbackend.mapper;

import com.example.eticaretbackend.dto.*;
import com.example.eticaretbackend.model.*;
import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    // 🔹 Entity → DTO
    public static OrderDTO toDTO(Order order) {
        if (order == null) return null;

        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setTotalPrice(order.getTotalPrice());

        // Enum'un hem orijinal adı hem Türkçe gösterimi
        dto.setStatus(order.getStatus().name());                // Örn: "PENDING"
        dto.setStatusDisplay(order.getStatus().getDisplayName()); // Örn: "Beklemede"

        dto.setCreatedAt(order.getCreatedAt());

        // 🔹 Müşteri bilgileri
        if (order.getCustomer() != null) {
            dto.setCustomerId(order.getCustomer().getId());
            dto.setCustomerUsername(order.getCustomer().getUsername());
        }

        // 🔹 Teslimat adresi
        if (order.getShippingAddress() != null) {
            dto.setShippingAddress(toAddressDTO(order.getShippingAddress()));
        }

        // 🔹 Fatura adresi
        if (order.getBillingAddress() != null) {
            dto.setBillingAddress(toAddressDTO(order.getBillingAddress()));
        }

        // 🔹 Sipariş kalemleri
        if (order.getOrderItems() != null) {
            dto.setItems(order.getOrderItems().stream()
                    .map(OrderMapper::toItemDTO)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    // 🔹 DTO → Entity (sipariş oluşturmak için)
    public static Order toEntity(OrderDTO dto, Customer customer,
                                 CustomerAddress shippingAddress,
                                 CustomerAddress billingAddress) {

        if (dto == null) return null;

        Order order = new Order();
        order.setCustomer(customer);
        order.setShippingAddress(shippingAddress);
        order.setBillingAddress(billingAddress);
        order.setTotalPrice(dto.getTotalPrice() != null ? dto.getTotalPrice() : 0.0);
        order.setStatus(dto.getStatus() != null ?
                OrderStatus.valueOf(dto.getStatus()) : OrderStatus.PENDING);
        return order;
    }

    // 🔹 CustomerAddress → DTO
    private static CustomerAddressDTO toAddressDTO(CustomerAddress address) {
        if (address == null) return null;

        CustomerAddressDTO dto = new CustomerAddressDTO();
        dto.setId(address.getId());
        dto.setAddressType(address.getAddressType());
        dto.setShippingAddress(address.getShippingAddress());
        dto.setBillingAddress(address.getBillingAddress());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setPostalCode(address.getPostalCode());
        dto.setCompanyName(address.getCompanyName());
        dto.setTaxNumber(address.getTaxNumber());
        dto.setTaxOffice(address.getTaxOffice());
        return dto;
    }

    // 🔹 OrderItem → DTO
    private static OrderItemDTO toItemDTO(OrderItem item) {
        if (item == null) return null;

        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getName());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        return dto;
    }
}
