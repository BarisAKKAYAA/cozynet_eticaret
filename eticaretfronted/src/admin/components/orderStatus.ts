// orderStatus.ts
export const orderStatusOptions = [
  { value: "PENDING", label: "Beklemede" },
  { value: "CONFIRMED", label: "Onaylandı" },
  { value: "SHIPPED", label: "Kargoya Verildi" },
  { value: "DELIVERED", label: "Teslim Edildi" },
  { value: "CANCELLED", label: "İptal Edildi" },
  { value: "RETURNED", label: "İade Edildi" },
] as const;

export type OrderStatus = (typeof orderStatusOptions)[number]["value"];
