package com.example.eticaretbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private Long id;             // Müşteri ID
    private String username;     // Kullanıcı adı
    private String password;     // Şifre
    private String email;        // E-posta adresi
    private String firstName;    // Adı
    private String lastName;     // Soyadı
    private String phone;        // Telefon numarası

    private List<CustomerAddressDTO> addresses; // Müşteriye ait adreslerin listesi
}
