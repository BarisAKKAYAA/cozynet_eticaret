package com.example.eticaretbackend.mapper;

import com.example.eticaretbackend.dto.CustomerAddressDTO;
import com.example.eticaretbackend.dto.CustomerDTO;
import com.example.eticaretbackend.model.Customer;
import com.example.eticaretbackend.model.CustomerAddress;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.stream.Collectors;

public class CustomerMapper {

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 🔹 Customer → CustomerDTO
    public static CustomerDTO toDTO(Customer customer) {
        if (customer == null) return null;

        CustomerDTO dto = new CustomerDTO();
        dto.setId(customer.getId());
        dto.setUsername(customer.getUsername());
        dto.setEmail(customer.getEmail());
        dto.setFirstName(customer.getFirstName());
        dto.setLastName(customer.getLastName());
        dto.setPhone(customer.getPhone());

        // Adresleri de DTO’ya çevir
        if (customer.getAddresses() != null) {
            dto.setAddresses(customer.getAddresses().stream()
                    .map(CustomerMapper::toAddressDTO)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    // 🔹 CustomerDTO → Customer
    public static Customer toEntity(CustomerDTO dto) {
        if (dto == null) return null;

        Customer customer = new Customer();
        customer.setId(dto.getId());
        customer.setUsername(dto.getUsername());
        customer.setEmail(dto.getEmail());
        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setPhone(dto.getPhone());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            customer.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        // Adres listesi varsa entity’ye çevir
        if (dto.getAddresses() != null) {
            customer.setAddresses(dto.getAddresses().stream()
                    .map(CustomerMapper::toAddressEntity)
                    .peek(a -> a.setCustomer(customer))
                    .collect(Collectors.toList()));
        }

        return customer;
    }

    // 🔹 Entity list → DTO list
    public static List<CustomerDTO> toDTOList(List<Customer> customers) {
        if (customers == null || customers.isEmpty()) return List.of();
        return customers.stream()
                .map(CustomerMapper::toDTO)
                .collect(Collectors.toList());
    }

    // 🔹 Customer entity’yi DTO ile güncelle
    public static void updateEntity(Customer customer, CustomerDTO dto) {
        if (customer == null || dto == null) return;

        if (dto.getUsername() != null) customer.setUsername(dto.getUsername());
        if (dto.getEmail() != null) customer.setEmail(dto.getEmail());
        if (dto.getFirstName() != null) customer.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) customer.setLastName(dto.getLastName());
        if (dto.getPhone() != null) customer.setPhone(dto.getPhone());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            customer.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
    }

    // 🔹 CustomerAddress → DTO
    public static CustomerAddressDTO toAddressDTO(CustomerAddress address) {
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

    // 🔹 CustomerAddressDTO → Entity
    public static CustomerAddress toAddressEntity(CustomerAddressDTO dto) {
        if (dto == null) return null;

        CustomerAddress address = new CustomerAddress();
        address.setId(dto.getId());
        address.setAddressType(dto.getAddressType());
        address.setShippingAddress(dto.getShippingAddress());
        address.setBillingAddress(dto.getBillingAddress());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setPostalCode(dto.getPostalCode());
        address.setCompanyName(dto.getCompanyName());
        address.setTaxNumber(dto.getTaxNumber());
        address.setTaxOffice(dto.getTaxOffice());

        return address;
    }
}
