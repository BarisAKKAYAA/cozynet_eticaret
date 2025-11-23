package com.example.eticaretbackend.controller;

import com.example.eticaretbackend.dto.CustomerAddressDTO;
import com.example.eticaretbackend.service.CustomerAddressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController  // Bu sınıfın bir REST API denetleyicisi olduğunu belirtir
@RequestMapping("/api/addresses")  // Tüm isteklerin "/api/addresses" yoluyla başlamasını sağlar
@CrossOrigin(origins = "http://localhost:5173") // React uygulamasından gelen isteklere izin verir
public class CustomerAddressController {

    private final CustomerAddressService addressService;  // Adres işlemlerini yöneten servis sınıfı

    // Servis sınıfı dependency injection (bağımlılık enjeksiyonu) ile alınır
    public CustomerAddressController(CustomerAddressService addressService) {
        this.addressService = addressService;
    }

    // Belirli bir müşterinin tüm adreslerini getirir
    @GetMapping("/{customerId}")
    public List<CustomerAddressDTO> getCustomerAddresses(@PathVariable Long customerId) {
        return addressService.getAddressesByCustomerId(customerId);
    }

    // Yeni bir adres ekler veya mevcut adresi günceller
    @PostMapping
    public CustomerAddressDTO addAddress(@RequestBody CustomerAddressDTO dto) {
        return addressService.saveAddress(dto);
    }
}
