package com.example.eticaretbackend.dto;

import com.example.eticaretbackend.model.CustomerAddress.AddressType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerAddressDTO {

    private Long id;                    // Adres kaydının benzersiz kimliği
    private Long customerId;            // Bu adresin ait olduğu müşteri ID’si
    private AddressType addressType;    // Adresin tipi (örneğin: SHIPPING veya BILLING)
    private String shippingAddress;     // Teslimat adresi bilgisi
    private String billingAddress;      // Fatura adresi bilgisi
    private String city;                // Şehir adı
    private String state;               // İlçe veya bölge adı
    private String postalCode;          // Posta kodu
    private String companyName;         // Faturadaki şirket adı (varsa)
    private String taxNumber;           // Vergi numarası (varsa)
    private String taxOffice;           // Vergi dairesi adı (varsa)
}
