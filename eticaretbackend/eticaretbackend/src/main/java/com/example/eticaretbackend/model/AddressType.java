package com.example.eticaretbackend.model;

public enum AddressType {
    SHIPPING("Teslimat Adresi"),
    BILLING("Fatura Adresi");

    private final String displayName;

    AddressType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}