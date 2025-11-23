package com.example.eticaretbackend.repository;

import com.example.eticaretbackend.model.CustomerAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// CustomerAddress tablosu için JPA repository arayüzü
public interface CustomerAddressRepository extends JpaRepository<CustomerAddress, Long> {

    // Belirli bir müşteriye ait adresleri döndürür
    List<CustomerAddress> findByCustomerId(Long customerId);
}
