export interface Feature {
  color?: string;
  material?: string;
  size?: string;
}

export interface ProductViewDTO {
  id: number;               // Ürünün benzersiz ID'si
  name: string;             // Ürünün adı
  description: string;      // Ürünün açıklaması
  price: number;            // Ürünün fiyatı
  image_url: string;        // Ürünün ana görsel URL'si
  images?: string[];        // Ürünün diğer görselleri
  categoryName?: string;    // Ürünün kategori adı
  categoryId?: number;      // Ürünün kategori Id
  sku?: string;             // Ürünün stok kodu (SKU)
  stock?: number;           // Ürün stoğu miktarı   
  features?: Feature[];     // Ürünün özellikleri (renk, malzeme, boyut vb.) 
  avgRating?: number;       // Ürünün ortalama puanı
  reviewCount?: number;     // Ürüne yapılan toplam yorum sayısı
  totalSold?: number;       // Ürünün toplam satışı
  createdAt?: string;       // Ürünün eklenme tarihi
  updatedAt?: string;       // Ürünün güncellenme tarihi
}

