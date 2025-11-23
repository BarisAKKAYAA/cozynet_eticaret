import { createContext } from "react"; // React'tan context oluşturmak için createContext fonksiyonu alınır
import type { CustomerDTO } from "../types/customer"; // Müşteri tipi (veri yapısı)
import type { CartItem } from "../types/cart"; // Sepetteki ürün tipi (veri yapısı)

interface AppContextType {
  // 🔐 Auth (Kimlik / Giriş işlemleri)
  customer: CustomerDTO | null; // Giriş yapan müşteri bilgisi veya null
  isLoggedIn: boolean; // Kullanıcının giriş yapıp yapmadığını belirtir
  login: (username: string, password: string) => Promise<void>; // Giriş yapma fonksiyonu (asenkron)
  logout: () => void; // Çıkış yapma fonksiyonu

  // 🛒 Cart (Sepet işlemleri)
  cartItems: CartItem[]; // Sepetteki ürünlerin listesi
  addToCart: (item: CartItem) => void; // Ürünü sepete ekleyen fonksiyon
  removeFromCart: (id: number | string) => void; // Ürünü sepetten kaldıran fonksiyon
  increaseQuantity: (id: number | string) => void; // Ürün miktarını artıran fonksiyon
  decreaseQuantity: (id: number | string) => void; // Ürün miktarını azaltan fonksiyon
  clearCart: () => void; // Sepeti tamamen temizleyen fonksiyon
  subtotal: number; // Sepetteki ürünlerin toplam tutarı
}

export const AppContext = createContext<AppContextType>({
  customer: null, // Başlangıçta giriş yapan müşteri yok
  isLoggedIn: false, // Kullanıcı varsayılan olarak çıkışta
  login: async () => {}, // Boş login fonksiyonu (gerçek işlev provider'da tanımlanır)
  logout: () => {}, // Boş logout fonksiyonu
  cartItems: [], // Başlangıçta sepet boş
  addToCart: () => {}, // Boş sepet ekleme fonksiyonu
  removeFromCart: () => {}, // Boş sepetten çıkarma fonksiyonu
  increaseQuantity: () => {}, // Boş miktar artırma fonksiyonu
  decreaseQuantity: () => {}, // Boş miktar azaltma fonksiyonu
  clearCart: () => {}, // Boş sepet temizleme fonksiyonu
  subtotal: 0, // Başlangıçta toplam fiyat 0
});
