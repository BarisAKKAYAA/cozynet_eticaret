// src/pages/MyOrders.tsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import type { OrderDTO } from "../types/orderDetail";




const MyOrdersPage: React.FC = () => {
  const { customer } = useContext(AppContext);
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // Sipariş durumuna göre renk döndüren yardımcı fonksiyon
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Beklemede":       // PENDING
        return "orange";
      case "Onaylandı":       // CONFIRMED
        return "blue";
      case "Kargoya Verildi": // SHIPPED
        return "purple";
      case "Teslim Edildi":   // DELIVERED
        return "green";
      case "İptal Edildi":    // CANCELLED
        return "red";
      case "İade Edildi":     // RETURNED
        return "brown";
      default:
        return "black";
    }
  };


  // Siparişleri getiren useEffect
  useEffect(() => {
    if (!customer) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get<OrderDTO[]>(
          `http://localhost:8080/api/orders/customer/${customer.id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Siparişler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customer]);

  // Kullanıcı giriş yapmamışsa uyarı göster
  if (!customer) {
    return <p className="text-center mt-5 text-danger">⚠️ Lütfen giriş yapın.</p>;
  }

  // Yüklenme aşamasında
  if (loading) {
    return <p className="text-center mt-5 text-muted">⏳ Siparişler yükleniyor...</p>;
  }

  // Hiç sipariş yoksa
  if (orders.length === 0) {
    return <p className="text-center mt-5 text-muted">🛒 Henüz siparişiniz yok.</p>;
  }

  return (
    <div className="product-section">
      <div className="container my-5">
        <div className="max-w-6xl mx-auto p-4">
          <h2 className="text-3xl font-bold mb-5 text-center text-primary">🧾 SİPARİŞLERİM</h2>

          {/* Tablo kutusu */}
          <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
            <table className="table table-hover align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">Sipariş No</th>
                  <th className="px-4 py-3">Tarih</th>
                  <th className="px-4 py-3">Durum</th>
                  <th className="px-4 py-3">Toplam</th>
                  <th className="px-4 py-3">Ürünler</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-bottom">
                    {/* Sipariş ID */}
                    <td className="fw-bold">{order.id}</td>

                    {/* Tarih (örnek: 3 Kasım 2025 20:14) */}
                    <td>{new Date(order.createdAt!).toLocaleString("tr-TR")}</td>

                    {/* Durum (renkli rozet ile) */}
                    <td style={{ color: getStatusColor(order.statusDisplay || "") }}>
                      {order.statusDisplay || "DURUM YOK"}
                    </td>

                    {/* Toplam fiyat */}
                    <td className="fw-semibold">{order.totalPrice.toLocaleString("tr-TR")} ₺</td>

                    {/* Ürün listesi */}
                    <td>
                      <ul className="list-unstyled text-start m-0">
                        {order.items.map((item) => (
                          <li key={item.id} className="small text-muted">
                            {item.productName} — {item.quantity} adet — {item.price.toLocaleString("tr-TR")} ₺
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
