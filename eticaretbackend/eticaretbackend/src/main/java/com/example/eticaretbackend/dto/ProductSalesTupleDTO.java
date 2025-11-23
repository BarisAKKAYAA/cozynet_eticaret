package com.example.eticaretbackend.dto;

public class ProductSalesTupleDTO {
    private Long productId;
    private Long totalQuantity;

    public ProductSalesTupleDTO(Long productId, Long totalQuantity) {
        this.productId = productId;
        this.totalQuantity = totalQuantity;
    }

    // Getter & Setter
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public Long getTotalQuantity() { return totalQuantity; }
    public void setTotalQuantity(Long totalQuantity) { this.totalQuantity = totalQuantity; }
}
