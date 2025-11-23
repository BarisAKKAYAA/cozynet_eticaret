package com.example.eticaretbackend.service;

import com.example.eticaretbackend.dto.CustomerAddressDTO;
import com.example.eticaretbackend.mapper.CustomerAddressMapper;
import com.example.eticaretbackend.model.Customer;
import com.example.eticaretbackend.model.CustomerAddress;
import com.example.eticaretbackend.repository.CustomerAddressRepository;
import com.example.eticaretbackend.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service  // Bu sınıfın bir servis bileşeni olduğunu belirtir
public class CustomerAddressService {

    private final CustomerAddressRepository addressRepository;  // Adres veritabanı işlemleri için repository
    private final CustomerRepository customerRepository;        // Müşteri veritabanı işlemleri için repository

    // Repository bağımlılıklarını constructor aracılığıyla enjekte eder
    public CustomerAddressService(CustomerAddressRepository addressRepository, CustomerRepository customerRepository) {
        this.addressRepository = addressRepository;
        this.customerRepository = customerRepository;
    }

    // Belirli bir müşteriye ait tüm adresleri döndürür
    public List<CustomerAddressDTO> getAddressesByCustomerId(Long customerId) {
        return addressRepository.findByCustomerId(customerId)
                .stream()                                  // Listeyi stream'e çevirir
                .map(CustomerAddressMapper::toDTO)         // Her entity'yi DTO'ya dönüştürür
                .collect(Collectors.toList());             // Sonuçları liste olarak toplar
    }

    // Yeni bir adres kaydeder veya mevcut adresi günceller
    public CustomerAddressDTO saveAddress(CustomerAddressDTO dto) {
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));  // Müşteri bulunamazsa hata fırlatır

        CustomerAddress entity = CustomerAddressMapper.toEntity(dto, customer);  // DTO'dan entity oluşturur
        CustomerAddress saved = addressRepository.save(entity);                  // Entity'yi veritabanına kaydeder
        return CustomerAddressMapper.toDTO(saved);                               // Kaydedilen entity'yi DTO olarak döndürür
    }
}
