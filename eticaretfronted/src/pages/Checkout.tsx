import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import citiesData from "../data/cities.json";
import "react-toastify/dist/ReactToastify.css";
import type { CustomerAddressDTO } from "../types/orderDetail";

export interface CheckoutData {
  // Müşterinin adres bilgisi (tek bir adres)
  customerAddress: CustomerAddressDTO;

  // Ödeme yöntemi: nakit, banka havalesi veya kredi kartı
  paymentMethod: "CASH_ON_DELIVERY" | "BANK_TRANSFER" | "CREDIT_CARD";

  // Sepetteki ürünler
  cartItems: {
    productId: number | string;   // Ürün ID'si
    productName: string;          // Ürün adı
    price: number;                // Ürün fiyatı
    quantity: number;             // Adet
    imageUrl?: string;            // Opsiyonel ürün resmi
  }[];
}


const CheckoutPage: React.FC = () => {
  const { cartItems, customer, clearCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [shippingDistricts, setShippingDistricts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

const [checkoutData, setCheckoutData] = useState<CheckoutData>({
  // Müşterinin adres bilgileri
  customerAddress: {
    addressType: "SHIPPING", // ✅ Checkbox işaretli değilse SHIPPING, işaretli ise BILLING
    shippingAddress: "",      // Teslimat adresi
    billingAddress: "",       // Fatura adresi (opsiyonel)
    city: "",                 // Şehir
    state: "",                // İlçe
    postalCode: "",           // Posta kodu
    companyName: "",          // Firma adı (opsiyonel)
    taxNumber: "",            // Vergi numarası (opsiyonel)
    taxOffice: "",            // Vergi dairesi (opsiyonel)
  },

  // Ödeme yöntemi (varsayılan: kapıda ödeme)
  paymentMethod: "CASH_ON_DELIVERY",

  // Sepet ürünleri
  cartItems: [],
});


  const paymentMethods: CheckoutData["paymentMethod"][] = [
    "CASH_ON_DELIVERY",
    "BANK_TRANSFER",
    "CREDIT_CARD",
  ];

useEffect(() => {
  // Sepet değiştiğinde checkoutData.cartItems'ı güncelle
  setCheckoutData(prev => ({
    ...prev,          // Mevcut checkoutData'yı koru
    cartItems: cartItems || [], // Yeni cartItems değerini set et, yoksa boş dizi
  }));
}, [cartItems]); // cartItems değiştiğinde tetiklenir


  if (!customer) return <p>Yükleniyor...</p>;

  // il ilçe değişikliği
  const handleCityChange = (city: string) => {
    const cityObj = citiesData.find(c => c.il_adi === city);
    const districts = cityObj ? cityObj.ilceler.map(d => d.ilce_adi) : [];
    setShippingDistricts(districts);
    setCheckoutData(prev => ({
      ...prev,
      customerAddress: { ...prev.customerAddress, city, state: "" },
    }));
  };

 const handlePlaceOrder = async () => {
  // Giriş yapılmamışsa sipariş verilemez
  if (!customer) return;

  const { customerAddress, paymentMethod } = checkoutData;

  // Adres bilgilerini kontrol et
  if (!customerAddress.shippingAddress || !customerAddress.city || !customerAddress.state) {
    toast.error("Lütfen adres bilgilerinizi doldurun.");
    return;
  }

  // Sepetin boş olup olmadığını kontrol et
  if (!cartItems || cartItems.length === 0) {
    toast.error("Sepetiniz boş!");
    return;
  }

  // Yükleniyor durumunu başlat
  setLoading(true);

  try {
    //  Sipariş için gönderilecek payload
    const orderPayload = {
      customerId: customer.id,
      shippingAddress: customerAddress, // Tek DTO olarak gönderiliyor
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      paymentType: paymentMethod,
    };

    // Backend'e siparişi gönder
    const res = await axios.post<{ id: number }>(
      `http://localhost:8080/api/orders/customer/${customer.id}`,
      orderPayload
    );

    // Başarılı sipariş mesajı
    toast.success("Siparişiniz başarıyla alındı!", { position: "top-right" });

    // Sepeti temizle
    clearCart();

    // Sipariş ID al ve ödeme sayfasına yönlendir
    const orderId = res.data.id;
    setTimeout(() => {
      if (paymentMethod === "CASH_ON_DELIVERY" || paymentMethod === "BANK_TRANSFER") {
        navigate("/thankyou", { state: { orderId } });
      } else {
        navigate("/credit-card-payment", { state: { orderId } });
      }
    }, 0);
  } catch (err: unknown) {
    // Hata durumunda kullanıcıya mesaj göster
    if (axios.isAxiosError(err)) {
      toast.error(err.response?.data?.message || "Sipariş oluşturulamadı.", { position: "top-right" });
    } else {
      toast.error("Sipariş oluşturulamadı.", { position: "top-right" });
    }
  } finally {
    // 🔹 Yükleniyor durumunu kapat
    setLoading(false);
  }
};


  return (
    <div className="product-section">
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            {/* Müşteri Bilgileri */}
            <div className="card p-4 mb-4 shadow-sm border-0">
              <h4 className="mb-3 text-primary fw-bold">👤 Müşteri Bilgileri</h4>
              <p><strong>Kullanıcı Adı:</strong> {customer.username}</p>
              <p><strong>Adınız Soyadınız:</strong> {customer.firstName} {customer.lastName}</p>
              <p><strong>E-posta:</strong> {customer.email}</p>
              {customer.phone && <p><strong>Telefon:</strong> {customer.phone}</p>}
            </div>

           {/* Adres ve Fatura Bilgileri */}
            <div className="card p-4 mb-4 shadow-sm border-0">
              <h4 className="mb-3 text-success fw-bold">📦 Adres Bilgileri</h4>
              <div className="row g-3">
                {/* Teslimat Adresi */}
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Adres"
                    value={checkoutData.customerAddress.shippingAddress}
                    onChange={e =>
                      setCheckoutData(prev => ({
                        ...prev,
                        customerAddress: { ...prev.customerAddress, shippingAddress: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    value={checkoutData.customerAddress.city}
                    onChange={e => handleCityChange(e.target.value)}
                  >
                    <option value="">Şehir seçiniz</option>
                    {citiesData.map(c => (
                      <option key={c.il_adi} value={c.il_adi}>{c.il_adi}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    value={checkoutData.customerAddress.state}
                    onChange={e =>
                      setCheckoutData(prev => ({
                        ...prev,
                        customerAddress: { ...prev.customerAddress, state: e.target.value },
                      }))
                    }
                    disabled={!shippingDistricts.length}
                  >
                    <option value="">İlçe seçiniz</option>
                    {shippingDistricts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Posta Kodu"
                    className="form-control"
                    maxLength={10}
                    value={checkoutData.customerAddress.postalCode}
                    onChange={e => {

                      const value = e.target.value.replace(/\D/g, "");
                      setCheckoutData(prev => ({
                        ...prev,
                        customerAddress: { ...prev.customerAddress, postalCode: value },
                      }));
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Türkiye"
                    className="form-control"
                  />
                </div>
              </div>

              {/* Fatura Checkbox */}
              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={checkoutData.customerAddress.addressType === "BILLING"}
                  onChange={e =>
                    setCheckoutData(prev => ({
                      ...prev,
                      customerAddress: {
                        ...prev.customerAddress,
                        addressType: e.target.checked ? "BILLING" : "SHIPPING",
                      },
                    }))
                  }
                />
                <label className="form-check-label">Fatura adresim buraya kesilsin</label>
              </div>

              {/* Fatura alanları sadece checkbox işaretli ise göster */}
              {checkoutData.customerAddress.addressType === "BILLING" && (
                <div className="row g-3 mt-2">
                  <h4 className="mb-3 text-success fw-bold">🧾 Fatura Bilgileri</h4>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Fatura Adresi"
                      value={checkoutData.customerAddress.billingAddress}
                      onChange={e =>
                        setCheckoutData(prev => ({
                          ...prev,
                          customerAddress: { ...prev.customerAddress, billingAddress: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Firma Adı"
                      value={checkoutData.customerAddress.companyName || ""}
                      onChange={e =>
                        setCheckoutData(prev => ({
                          ...prev,
                          customerAddress: { ...prev.customerAddress, companyName: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Vergi No"
                      maxLength={11}
                      value={checkoutData.customerAddress.taxNumber || ""}
                      onChange={e => {
                        const value = e.target.value.replace(/\D/g, "");
                        setCheckoutData(prev => ({
                          ...prev,
                          customerAddress: { ...prev.customerAddress, taxNumber: value },
                        }));
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Vergi Dairesi"
                      value={checkoutData.customerAddress.taxOffice || ""}
                      onChange={e =>
                        setCheckoutData(prev => ({
                          ...prev,
                          customerAddress: { ...prev.customerAddress, taxOffice: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Sepet ve Ödeme */}
          <div className="col-md-4 mt-4 mt-md-0">
            <div className="card p-4 shadow-sm border-0">
              <h4 className="mb-3 fw-bold">🛒 Sepet Özeti</h4>
              {checkoutData.cartItems?.length === 0 ? (
                <p>Sepetiniz boş</p>
              ) : (
                checkoutData.cartItems.map(item => (
                  <div key={item.productId} className="d-flex align-items-center mb-3">
                    <img
                      src={`http://localhost:8080${item.imageUrl}`}
                      alt={item.productName}
                      width={60}
                      height={60}
                      className="me-3 rounded"
                      onError={(e) => ((e.target as HTMLImageElement).src = "http://localhost:8080/images/default.png")}
                    />
                    <div>
                      <p className="mb-0">{item.productName}</p>
                      <small>
                        {item.quantity} x {item.price.toFixed(2)}₺
                      </small>
                    </div>
                  </div>
                ))
              )}
              <hr />
              <h5 className="text-end fw-bold">
                Toplam:{" "}
                {checkoutData.cartItems?.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}₺
              </h5>

              <div className="mt-3">
                <h5 className="fw-bold mb-2">💳 Ödeme Yöntemi</h5>
                {paymentMethods.map(method => (
                  <div className="form-check" key={method}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="paymentMethod"
                      checked={checkoutData.paymentMethod === method}
                      onChange={() => setCheckoutData(prev => ({ ...prev, paymentMethod: method }))}
                    />
                    <label className="form-check-label">
                      {method === "CASH_ON_DELIVERY"
                        ? "Kapıda Ödeme"
                        : method === "BANK_TRANSFER"
                          ? "Havale / EFT"
                          : "Kredi Kartı"}
                    </label>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? "Sipariş Gönderiliyor..." : "Siparişi Tamamla"}
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CheckoutPage;
