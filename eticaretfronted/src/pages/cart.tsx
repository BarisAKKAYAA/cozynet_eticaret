import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Cart: React.FC = () => {
  // Sepet verilerini ve işlevleri context'ten alıyoruz
  const {
    cartItems,        // Sepetteki ürün listesi
    increaseQuantity, // Ürün adetini artırma
    decreaseQuantity, // Ürün adetini azaltma
    removeFromCart,   // Ürünü sepetten silme
    clearCart,        // Tüm sepeti temizleme
    subtotal,         // Ara toplam fiyat
  } = useContext(AppContext);

  // Sepet boşsa gösterilecek alan
  if (cartItems.length === 0) {
    return (
      <div className="product-section text-center">
        <div>
          <h3>Sepetiniz boş 🛒</h3>
          <p className="text-muted mb-4">Henüz bir ürün eklemediniz.</p>
        </div>
      </div>
    );
  }

  // Sepet doluysa tabloyu göster
  return (
    <div className="product-section">
      <div className="container my-5">
        <h2 className="mb-4 text-center">Sepetim</h2>

        {/* Ürün tablosu */}
        <div className="table-responsive">
          <table className="table align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Ürün</th>
                <th>Adı</th>
                <th>Fiyat</th>
                <th>Adet</th>
                <th>Toplam</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  {/* Ürün görseli */}
                  <td>
                    <img
                      src={`http://localhost:8080${item.imageUrl}`}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                      }}
                      // Eğer resim yüklenmezse varsayılan görsel göster
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                          "http://localhost:8080/images/default.png")
                      }
                    />
                  </td>

                  {/* Ürün adı */}
                  <td>{item.name}</td>

                  {/* Ürün fiyatı */}
                  <td>₺{item.price.toFixed(2)}</td>

                  {/* Adet artırma/azaltma alanı */}
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Ürün toplam fiyatı */}
                  <td>₺{(item.price * item.quantity).toFixed(2)}</td>

                  {/* Ürünü sepetten silme butonu */}
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alt kısım: sepet temizleme ve satın alma alanı */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
          {/* Sepeti tamamen temizle */}
          <button
            className="btn btn-outline-danger mb-3 mb-md-0"
            onClick={clearCart}
          >
            Sepeti Temizle
          </button>

          {/* Ara toplam ve satın alma butonu */}
          <div className="text-end">
            <h4>Ara Toplam: ₺{subtotal.toFixed(2)}</h4>
            <Link to="/checkout" className="btn btn-primary mt-2">
              Satın Al
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
