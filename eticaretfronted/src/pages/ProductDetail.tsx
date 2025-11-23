import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductReviews from "../pages/ProductReviews";
import type { Review } from "../types/review";
import type { ProductViewDTO } from "../types/product";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductViewDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const { addToCart } = useContext(AppContext);


  // Sayfa yüklendiğinde ürün detayını ve yorumları getirir
  useEffect(() => {
    if (!id) {
      setError("Ürün ID bulunamadı!");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Ürün yüklenemedi!"))
      .finally(() => setLoading(false));

    axios
      .get(`http://localhost:8080/api/reviews/product/${id}`)
      .then((res) => setReviews(res.data))
      .catch(() => console.log("Yorumlar yüklenemedi."));
  }, [id]);



// Ürünü sepete ekleme işlemi
  const handleAddToCart = () => {
    if (!product) return;

    if (!product.stock || product.stock <= 0) {
      toast.error("Ürün stokta yok!", { position: "top-right" });
      return;
    }

    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      productName: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.image_url
    });

    toast.dismiss();
    toast.success(`${product.name} sepete eklendi!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });

    setTimeout(() => {
      navigate("/cart");
    }, 0);


  };

  if (loading || error) {
    return (
      <p className={`text-center mt-5 ${error ? "text-danger" : ""}`}>
        {error || "Yükleniyor..."}
      </p>
    );
  }

  if (!product) return null;

  return (
    <div className="product-section">
      <div className="container my-5">
        <ToastContainer />
        <div className="row mb-5">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="card border-0 shadow-sm p-3 w-100">
              <img
                src={`http://localhost:8080${product.image_url}`}
                className="card-img-top img-fluid rounded"
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
                onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "http://localhost:8080/images/default.png")
                }
              />
            </div>
          </div>

          <div className="col-md-6">
            <h2 className="mb-2">{product.name}</h2>
            <p className="text-muted mb-2">
              Kategori: {product.categoryName || "Genel"}
            </p>
            <p className="text-muted mb-2">SKU: {product.sku || "12345"}</p>

            <h4 className="text-primary mb-3">₺ {product.price.toFixed(2)}</h4>
            <p className="mb-3">{product.description}</p>

            <ul className="list-unstyled mb-4">
              {product.features?.map((f, idx) => (
                <React.Fragment key={idx}>
                  {f.color && <li>Renk: {f.color}</li>}
                  {f.material && <li>Malzeme: {f.material}</li>}
                  {f.size && <li>Boyut: {f.size}</li>}
                </React.Fragment>
              ))}
              <li className="d-flex align-items-center gap-2 text-danger">
                📦 <strong>Stok durumu:</strong>{" "}
                {product.stock && product.stock > 0 ? "Var" : "Tükendi"}
              </li>
            </ul>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-lg flex-fill"
              disabled={!product.stock || product.stock <= 0}
            >
              🛒 Sepete Ekle
            </button>
          </div>
        </div>

        {/* Ürün Açıklamaları ve Tablo */}
        <div className="rte text--pull mt-10">
          <div className="answer" style={{ display: "block" }}>
            <div className="table-wrapper overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg shadow-lg min-w-[700px]">
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition">
                    <td className="w-1/2 font-semibold px-4 py-3 bg-blue-100 text-blue-800 flex items-center gap-2">
                      📦 Hızlı Kargo
                    </td>
                    <td className="w-1/2 px-4 py-3">
                      Tüm ürünler 1 iş günü içerisinde kargoya verilir ve
                      takip numarasıyla gönderilir.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-green-50 transition">
                    <td className="w-1/2 font-semibold px-4 py-3 bg-green-100 text-green-800 flex items-center gap-2">
                      🛡️ 1 Yıl Garanti
                    </td>
                    <td className="w-1/2 px-4 py-3">
                      Ürünlerimiz 1 yıl üretici garantisi kapsamındadır. Herhangi
                      bir üretim hatasında ücretsiz değişim yapılır.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-yellow-50 transition">
                    <td className="w-1/2 font-semibold px-4 py-3 bg-yellow-100 text-yellow-800 flex items-center gap-2">
                      ✅ Orijinal Ürün
                    </td>
                    <td className="w-1/2 px-4 py-3">
                      Tüm ürünlerimiz %100 orijinal ve lisanslıdır. Kalite
                      standartları garanti edilir.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="w-1/2 font-semibold px-4 py-3 bg-gray-100 flex items-center gap-2 text-gray-800">
                      🧼 Bakım & Temizlik
                    </td>
                    <td className="w-1/2 px-4 py-3">
                      Nemli bezle temizleyebilirsiniz. Minder kılıfları çıkarılabilir
                      ve elde yıkanabilir. Metal kısımları kuru bezle silebilirsiniz.
                      Düzenli bakım ürün ömrünü uzatır.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="w-1/2 font-semibold px-4 py-3 bg-gray-100 flex items-center gap-2 text-gray-800">
                      🔧 Kurulum
                    </td>
                    <td className="w-1/2 px-4 py-3">
                      Kurulum aletsiz ve kolaydır. 2 kişi ile yaklaşık 15 dakikada
                      tamamlanabilir. Kurulum kılavuzu kutu içindedir. Modüller
                      yer değiştirilebilir ve ekleme/çıkarma yapılabilir.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Product Reviews */}
        <ProductReviews productId={id!} initialReviews={reviews} />
      </div>
    </div>
  );
};

export default ProductDetail;
