package com.example.eticaretbackend.service;

import com.example.eticaretbackend.dto.CustomerDTO;
import com.example.eticaretbackend.exception.ResourceNotFoundException;
import com.example.eticaretbackend.mapper.CustomerMapper;
import com.example.eticaretbackend.model.Customer;
import com.example.eticaretbackend.model.CustomerAddress;
import com.example.eticaretbackend.repository.CustomerAddressRepository;
import com.example.eticaretbackend.repository.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerAddressRepository customerAddressRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository,
                           CustomerAddressRepository customerAddressRepository,
                           PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.customerAddressRepository = customerAddressRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 🔹 Tüm müşterileri getir (adreslerle birlikte)
    @Transactional(readOnly = true)
    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(CustomerMapper::toDTO)
                .collect(Collectors.toList());
    }

    // 🔹 ID ile müşteri getir
    @Transactional(readOnly = true)
    public CustomerDTO getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Müşteri bulunamadı: " + id));
        return CustomerMapper.toDTO(customer);
    }

    // 🔹 Yeni müşteri oluştur (adreslerle birlikte)
    @Transactional
    public CustomerDTO createCustomer(CustomerDTO dto) {
        if (customerRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("Bu kullanıcı adı zaten alınmış!");
        }
        if (customerRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Bu e-posta zaten kayıtlı!");
        }

        Customer customer = CustomerMapper.toEntity(dto);
        customer.setPassword(passwordEncoder.encode(dto.getPassword()));

        // Önce müşteri kaydedilir
        Customer savedCustomer = customerRepository.save(customer);

        // Adres listesi varsa onları da kaydet
        if (dto.getAddresses() != null && !dto.getAddresses().isEmpty()) {
            List<CustomerAddress> addresses = savedCustomer.getAddresses();
            addresses.forEach(addr -> addr.setCustomer(savedCustomer));
            customerAddressRepository.saveAll(addresses);
        }

        log.info("Yeni müşteri oluşturuldu: {}", savedCustomer.getId());
        CustomerDTO result = CustomerMapper.toDTO(savedCustomer);
        result.setPassword(null);
        return result;
    }

    // 🔹 Mevcut müşteriyi güncelle (adreslerle birlikte)
    @Transactional
    public CustomerDTO updateCustomer(Long id, CustomerDTO dto) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Müşteri bulunamadı: " + id));

        CustomerMapper.updateEntity(existing, dto);

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            existing.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        // Adres güncelleme
        if (dto.getAddresses() != null) {
            // Önce eski adresleri sil (isteğe göre)
            customerAddressRepository.deleteAll(existing.getAddresses());
            existing.getAddresses().clear();

            // Yeni adresleri ekle
            List<CustomerAddress> newAddresses = dto.getAddresses().stream()
                    .map(CustomerMapper::toAddressEntity)
                    .peek(addr -> addr.setCustomer(existing))
                    .collect(Collectors.toList());

            existing.setAddresses(newAddresses);
            customerAddressRepository.saveAll(newAddresses);
        }

        Customer updated = customerRepository.save(existing);
        log.info("Müşteri güncellendi: {}", updated.getId());
        return CustomerMapper.toDTO(updated);
    }

    // 🔹 Müşteri sil
    @Transactional
    public void deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Müşteri bulunamadı: " + id));

        customerAddressRepository.deleteAll(customer.getAddresses());
        customerRepository.delete(customer);

        log.info("Müşteri silindi: {}", id);
    }

    // 🔹 Kullanıcı adıyla müşteri getir
    @Transactional(readOnly = true)
    public CustomerDTO findByUsername(String username) {
        Customer customer = customerRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı: " + username));
        return CustomerMapper.toDTO(customer);
    }

    // 🔹 Kullanıcı adı var mı kontrol et
    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        return customerRepository.existsByUsername(username);
    }

    // 🔹 Giriş kontrolü
    @Transactional(readOnly = true)
    public boolean authenticate(String username, String rawPassword) {
        Customer customer = customerRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı: " + username));

        return passwordEncoder.matches(rawPassword, customer.getPassword());
    }
}
