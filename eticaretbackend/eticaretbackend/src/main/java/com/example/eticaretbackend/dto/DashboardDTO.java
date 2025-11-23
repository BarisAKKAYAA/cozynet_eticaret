package com.example.eticaretbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardDTO {
    private long totalOrders;
    private long totalProducts;
    private long totalCustomer;
    private long totalSiteReview;

}