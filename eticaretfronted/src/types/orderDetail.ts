export interface OrderItemDTO {
  id?: number; 
  imageUrl?: string;
  productId:number | string;
  productName: string;
  price: number;
  quantity: number;
}

export interface CustomerAddressDTO {
  id?: number;                         // Adres ID'si (opsiyonel)
  customerId?: number;                 // Müşteri ID'si (opsiyonel)
  addressType: "SHIPPING" | "BILLING"; //Adres Tipi
  shippingAddress: string;             // Teslimat adresi (tek alan)
  billingAddress?: string;             // Fatura adresi (opsiyonel)
  city: string;                        // Şehir
  state: string;                       // İlçe / Bölge
  postalCode: string;                  // Posta kodu
  companyName?: string;                // Şirket adı (opsiyonel)
  taxNumber?: string;                  // Vergi numarası (opsiyonel)
  taxOffice?: string;                  // Vergi dairesi (opsiyonel)
}


export interface OrderDTO {
  id?: number;
  customerId: number;
  customerUsername?: string;
  shippingAddressId?: number;
  shippingAddress?: string;
  billingAddress?:string;
  totalPrice: number;
  status?: string;
  statusDisplay?: string;
  createdAt?: string;
  items: OrderItemDTO[];
}

