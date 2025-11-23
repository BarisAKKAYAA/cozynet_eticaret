package com.example.eticaretbackend.model;


public enum Role {
    USER("Kullanıcı"),
    ADMIN("Yönetici");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
