import React, { useState, useEffect, type ReactNode } from "react";
import type { CustomerDTO } from "../types/customer";
import type { CartItem } from "../types/cart";
import axios, { AxiosError } from "axios";
import { AppContext } from "./AppContext";

interface Props {
  children: ReactNode; // AppProvider içerisine sarılacak componentler
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  // -------------------------------
  // AUTH STATE
  // -------------------------------
  const [customer, setCustomer] = useState<CustomerDTO | null>(null); // Kullanıcı bilgisi
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giriş durumu

  // -------------------------------
  // CART STATE
  // -------------------------------
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Sepet ürünleri
  const [isCartInitialized, setIsCartInitialized] = useState(false); // Sepet yüklendi mi?

  // -------------------------------
  // GİRİŞ KONTROLÜ
  // -------------------------------
  useEffect(() => {
    const savedCustomer = localStorage.getItem("customer"); // Tarayıcıdan kullanıcı bilgisi al
    if (savedCustomer) {
      const parsed = JSON.parse(savedCustomer); 
      setCustomer(parsed); // State'e ata
      setIsLoggedIn(true); // Giriş durumunu true yap
    }
  }, []);

  // -------------------------------
  // KULLANICIYA ÖZEL SEPET YÜKLEME
  // -------------------------------
  useEffect(() => {
    if (isLoggedIn && customer) {
      const userCart = localStorage.getItem(`cart_${customer.id}`); // Kullanıcıya özel sepet
      if (userCart) {
        setCartItems(JSON.parse(userCart)); // Sepeti yükle
      } else {
        setCartItems([]); // Yoksa boş sepet
      }
    } else {
      setCartItems([]); // Giriş yoksa sepeti temizle
    }
    setIsCartInitialized(true); // Sepet hazır
  }, [isLoggedIn, customer]);

  // -------------------------------
  // KULLANICIYA ÖZEL SEPET KAYDETME
  // -------------------------------
  useEffect(() => {
    if (isCartInitialized && isLoggedIn && customer) {
      localStorage.setItem(`cart_${customer.id}`, JSON.stringify(cartItems)); // Sepeti kaydet
    }
  }, [cartItems, isCartInitialized, isLoggedIn, customer]);

  // -------------------------------
  // AUTH İŞLEMLERİ
  // -------------------------------
  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:8080/api/customers/login", { username, password }); // Backend login
      const data: CustomerDTO = res.data;
      setCustomer(data); // State'e ata
      setIsLoggedIn(true); // Giriş yapıldı
      localStorage.setItem("customer", JSON.stringify(data)); // Tarayıcıya kaydet
    } catch (err) {
      const error = err as AxiosError;
      throw new Error((error.response?.data as string) || "Sunucu hatası!"); // Hata mesajı
    }
  };

  const logout = () => {
    setCustomer(null); // Kullanıcıyı temizle
    setIsLoggedIn(false); // Giriş durumunu false yap
    localStorage.removeItem("customer"); // Tarayıcıdan kaldır
  };

  // -------------------------------
  // SEPET İŞLEMLERİ
  // -------------------------------
  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.productId === item.productId); // Ürün sepette var mı?
      if (existing) {
        return prev.map(i =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i // Miktarı artır
        );
      }
      return [...prev, item]; // Yeni ürünü ekle
    });
  };

  const removeFromCart = (id: number | string) =>
    setCartItems(prev => prev.filter(i => i.id !== id)); // Ürünü kaldır

  const increaseQuantity = (id: number | string) =>
    setCartItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)) // Miktarı 1 artır
    );

  const decreaseQuantity = (id: number | string) =>
    setCartItems(prev =>
      prev.map(i =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i // Miktarı 1 azalt (1’in altına düşmez)
      )
    );

  const clearCart = () => setCartItems([]); // Sepeti temizle

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // Sepet toplamı

  // -------------------------------
  // CONTEXT PROVIDER
  // -------------------------------
  return (
    <>
      {isCartInitialized && ( // Sepet yüklendiyse context’i aktif et
        <AppContext.Provider
          value={{
            customer,
            isLoggedIn,
            login,
            logout,
            cartItems,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            subtotal,
          }}
        >
          {children} {/* Alt componentler */}
        </AppContext.Provider>
      )}
    </>
  );
};
