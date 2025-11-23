package com.example.eticaretbackend.mapper;

import com.example.eticaretbackend.dto.CustomerAddressDTO;
import com.example.eticaretbackend.model.Customer;
import com.example.eticaretbackend.model.CustomerAddress;

public class CustomerAddressMapper {

    // CustomerAddress entity'sini CustomerAddressDTO'ya dönüştürür
    public static CustomerAddressDTO toDTO(CustomerAddress address) {
        if (address == null) return null;  // Null kontrolü

        return CustomerAddressDTO.builder()
                .id(address.getId())                                                   // Adres ID'si
                .customerId(address.getCustomer() != null ? address.getCustomer().getId() : null) // Müşteri ID'si
                .addressType(address.getAddressType())                                 // Adres tipi (SHIPPING / BILLING)
                .shippingAddress(address.getShippingAddress())                         // Teslimat adresi
                .billingAddress(address.getBillingAddress())                           // Fatura adresi
                .city(address.getCity())                                               // Şehir
                .state(address.getState())                                             // İlçe veya bölge
                .postalCode(address.getPostalCode())                                   // Posta kodu
                .companyName(address.getCompanyName())                                 // Şirket adı (varsa)
                .taxNumber(address.getTaxNumber())                                     // Vergi numarası (varsa)
                .taxOffice(address.getTaxOffice())                                     // Vergi dairesi (varsa)
                .build();                                                              // DTO nesnesini oluşturur
    }

    // CustomerAddressDTO nesnesini CustomerAddress entity'sine dönüştürür
    public static CustomerAddress toEntity(CustomerAddressDTO dto, Customer customer) {
        if (dto == null) return null;  // Null kontrolü

        return CustomerAddress.builder()
                .customer(customer)                                     // Adresin bağlı olduğu müşteri
                .addressType(dto.getAddressType())                      // Adres tipi
                .shippingAddress(dto.getShippingAddress())              // Teslimat adresi
                .billingAddress(dto.getBillingAddress())                // Fatura adresi
                .city(dto.getCity())                                    // Şehir
                .state(dto.getState())                                  // İlçe veya bölge
                .postalCode(dto.getPostalCode())                        // Posta kodu
                .companyName(dto.getCompanyName())                      // Şirket adı (varsa)
                .taxNumber(dto.getTaxNumber())                          // Vergi numarası (varsa)
                .taxOffice(dto.getTaxOffice())                          // Vergi dairesi (varsa)
                .build();                                               // Entity nesnesini oluşturur
    }
}
