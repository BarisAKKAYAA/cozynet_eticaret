package com.example.eticaretbackend.service;

import com.example.eticaretbackend.dto.DashboardDTO;
import com.example.eticaretbackend.repository.CustomerRepository;
import com.example.eticaretbackend.repository.OrderRepository;
import com.example.eticaretbackend.repository.ProductRepository;
import com.example.eticaretbackend.repository.SiteReviewRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final SiteReviewRepository siteReviewRepository;



    public DashboardDTO getStats() {

        DashboardDTO dto = new DashboardDTO();
        dto.setTotalOrders(orderRepository.count());
        dto.setTotalProducts(productRepository.count());
        dto.setTotalCustomer(customerRepository.count());
        dto.setTotalSiteReview(siteReviewRepository.count());

        return dto;
    }
}
