import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type { ProductViewDTO } from "../../types/product";





const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductViewDTO[]>([]);
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    axios
      .get<ProductViewDTO[]>("http://localhost:8080/api/admin/products/all")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ürün listesi yüklenemedi:", err);
        setLoading(false);
      });
  }, []);

    const handleDelete = async (id: number) => {
    if (!window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/admin/products/${id}`);
      // Ürün silindikten sonra state'i güncelle
      setProducts(products.filter((p) => p.id !== id));
      alert("Ürün başarıyla silindi!");
    } catch (error) {
      console.error("Ürün silinemedi:", error);
      alert("Ürün silinirken bir hata oluştu!");
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  
  return (
    <div className="product-section">
      <div className="container-fluid">
        <div className="mt-4">
          <h4 className="text-center align-middle">ÜRÜNLERİMİZ</h4>
          <Link
            to="../productsadd"
            className="custom-btn btn-sm me-2 mt-2 mb-2"
          >
            Yeni Ürün Ekle
          </Link>
          <div className="table-responsive">
            <table className="table table-striped table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Fotoğraf</th>
                  <th>Ürün Kodu</th>
                  <th>Ürün Adı</th>
                  <th>Kategori</th>
                  <th>Fiyat</th>
                  <th>Stok</th>
                  <th>İşlem</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>

                    <td>
                      {product.image_url ? (

                        <img
                          src={`http://localhost:8080${product.image_url}`}
                          alt={product.name}
                          onError={(e) => ((e.target as HTMLImageElement).src = "http://localhost:8080/images/default.png")}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />

                      ) : (
                        "—"
                      )}
                    </td>
                    <td>{product.sku}</td>
                    <td>{product.name}</td>
                    <td>{product.categoryName}</td>
                    <td>{product.price} ₺</td>
                    <td>{product.stock}</td>




                    <td>
                      <Link
                        to={`/admin/updateproductform/${product.id}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Güncelle
                      </Link>
                        <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Sil
                      </button>
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

export default Products;