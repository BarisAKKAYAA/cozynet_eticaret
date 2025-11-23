import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, message } from "antd";
import { orderStatusOptions, type OrderStatus } from "./orderStatus";

const { Option } = Select;

interface OrderDTO {
  id: number;
  customerId?: number | null;
  customerUsername?: string;
  totalPrice?: number;
  status?: string;
  statusDisplay?: string;
  createdAt?: string;
}

const CargoTable: React.FC = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<OrderDTO[]>("http://localhost:8080/api/admin/orders/all")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Cargo API Error:", err);
        setError("Siparişler yüklenirken bir hata oluştu.");
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/orders/${orderId}/status`, null, {
        params: { status: newStatus },
      });
      message.success("Sipariş durumu güncellendi");
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus,
                statusDisplay: orderStatusOptions.find(o => o.value === newStatus)?.label ?? "Bilinmiyor"

              }
            : order
        )
      );
    } catch (error) {
      console.error(error);
      message.error("Durum güncellenemedi");
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-5">
      <h4 className="mb-3">Tüm Siparişler</h4>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Sipariş No</th>
              <th>Müşteri</th>
              <th>Toplam Fiyat</th>
              <th>Durum</th>
              <th>Oluşturulma Tarihi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerUsername ?? "Bilinmiyor"}</td>
                <td>{order.totalPrice?.toFixed(2) ?? "0.00"} ₺</td>
                <td>
                  <Select
                    value={order.status}
                    onChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                    style={{ width: 150 }}
                  >
                    {orderStatusOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </td>
                <td>
                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Bilinmiyor"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CargoTable;
