import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type { ProductViewDTO } from "../types/product";
import type { CategoryDTO } from "../types/category";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCouch,
  FaBed,
  FaUtensils,
  FaLaptop,
  FaChild,
  FaTree,
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar
} from "react-icons/fa";
import type { CartItem } from "../types/cart";
import { AppContext } from "../context/AppContext";


// Kategorilere göre ikon eşleştirmesi
const icons: Record<string, React.ReactNode> = {
  Hepsi: <FaCouch />,
  "Oturma Odası": <FaCouch />,
  "Yatak Odası": <FaBed />,
  "Yemek Odası": <FaUtensils />,
  "Çalışma Odası": <FaLaptop />,
  "Genç Odası": <FaChild />,
  "Bahçe Mobilyaları": <FaTree />
};


// Ürün sıralama seçenekleri
const sortOptions = [
  { value: "price-asc", label: "Fiyata Göre ↑" },
  { value: "price-desc", label: "Fiyata Göre ↓" },
  { value: "rating-desc", label: "Puan ↓" },
  { value: "review-desc", label: "Yorum Sayısı ↓" },
  { value: "popularity-desc", label: "Popülerlik ↓" }
];


// Sıralama dropdown bileşeni
const SortSelect: React.FC<{ sortBy: string; setSortBy: (value: string) => void }> = ({ sortBy, setSortBy }) => (
  <select className="category-btn sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
    {sortOptions.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);


// Ürün puanlarını yıldız olarak gösteren bileşen
const StarRating: React.FC<{ avgRating?: number }> = ({ avgRating = 0 }) => (
  <>
    {[1, 2, 3, 4, 5].map((i) => {
      if (avgRating >= i) return <FaStar key={i} className="star-icon" />;
      else if (avgRating >= i - 0.5) return <FaStarHalfAlt key={i} className="star-icon" />;
      else return <FaRegStar key={i} className="star-icon" />;
    })}
  </>
);


// Kategori listesini mobil ve masaüstü için gösteren bileşen
const CategoryList: React.FC<{
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}> = ({ categories, selectedCategory, setSelectedCategory }) => (
  <>
    {/* Mobil görünüm */}
    <div className="d-lg-none mb-4">
      <ul className="category-list-mobile">
        {categories.map((category) => (
          <li key={category}>
            <button
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="category-icon">{icons[category] || <FaCouch />}</span>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Masaüstü görünüm */}
    <div className="d-none d-lg-block category-sidebar">
      <ul className="category-list-desktop">
        {categories.map((category) => (
          <li key={category}>
            <button
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="category-icon">{icons[category] || <FaCouch />}</span>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </>
);


// Ürünlerin listelendiği grid bileşeni
const ProductGrid: React.FC<{ products: ProductViewDTO[]; addToCart: (item: CartItem) => void }> = ({ products, addToCart }) => (
  <div className="row">
    {products.map((product) => (
      <div key={product.id} className="col-6 col-md-3 col-lg-2 mb-4">
        {/* Ürün detayına yönlendiren link */}
        <Link to={`/product/${product.id}`} className="product-item text-center" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="p-2" style={{ border: "1px solid #eee", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
            {/* Ürün resmi */}
            <img
              src={`http://localhost:8080${product.image_url}`}
              className="img-fluid product-thumbnail mb-2"
              alt={product.name}
              onError={(e) => ((e.target as HTMLImageElement).src = "http://localhost:8080/images/default.png")}
            />

            {/* Ürün adı ve fiyatı */}
            <h3 className="product-title mb-1">{product.name}</h3>
            <div className="product-price mb-1">{product.price.toLocaleString("tr-TR")} ₺</div>

            {/* Ürün puanı */}
            <div className="product-rating mb-2">
              <StarRating avgRating={product.avgRating ?? 0} />
              <span className="avg-rating ms-1">({(product.avgRating ?? 0).toFixed(1)})</span>
            </div>

            {/* Sepete ekleme butonu */}
            <a
              className="add-to-cart-icon"
              href="/cart"
              onClick={(e) => {
                e.preventDefault();

                // Stok kontrolü
                if (!product.stock || product.stock <= 0) {
                  toast.error("Ürün stokta yok!", { position: "top-right" });
                  return;
                }

                // Ürünü sepete ekle
                addToCart({
                  productId: product.id,
                  productName: product.name,
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  imageUrl: product.image_url,
                });

                // Eski bildirimleri kapat ve yeni bildirim göster
                toast.dismiss();
                toast.success(`${product.name} sepete eklendi!`, {
                  position: "top-right",
                  autoClose: 2000,
                  theme: "colored",
                });
              }}
            >
              <FaShoppingCart />
            </a>
          </div>
        </Link>
        
      </div>
    ))}
  </div>
);


// Ana Shop bileşeni
const Shop: React.FC = () => {
  // State tanımlamaları
  const [products, setProducts] = useState<ProductViewDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
  const [sortBy, setSortBy] = useState("price-asc");
  const { addToCart } = useContext(AppContext);

  const BASE_URL = "http://localhost:8080/api";

  // Ürünleri backend’den çek
  useEffect(() => {
    axios
      .get<ProductViewDTO[]>(`${BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Ürünler çekilemedi:", err));
  }, []);

  // Kategorileri backend’den çek
  useEffect(() => {
    axios
      .get<CategoryDTO[]>(`${BASE_URL}/categories`)
      .then((res) => setCategories([{ id: 0, name: "Hepsi" }, ...res.data]))
      .catch((err) => console.error("Kategoriler çekilemedi:", err));
  }, []);

  // Kategoriye göre filtreleme
  const filteredProducts =
    selectedCategory === "Hepsi" ? products : products.filter((p) => p.categoryName === selectedCategory);

  // Sıralama kriterine göre ürünleri sırala
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating-desc":
        return (b.avgRating ?? 0) - (a.avgRating ?? 0);
      case "review-desc":
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      case "popularity-desc":
        return (b.totalSold ?? 0) - (a.totalSold ?? 0);
      default:
        return 0;
    }
  });

  // JSX çıktısı
  return (
    <div className="product-section">
      <div className="container-fluid shop-container">
        <div className="row">
          {/* Sol sütun: kategori listesi */}
          <div className="col-lg-auto p-0">
            <CategoryList
              categories={categories.map((c) => c.name)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/* Sağ sütun: ürün listesi ve sıralama */}
          <div className="col">
            <div className="d-flex justify-content-end mb-3">
              <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <ProductGrid products={sortedProducts} addToCart={addToCart} />
          </div>
        </div>
      </div>

      {/* Bildirimler için ToastContainer */}
      <ToastContainer />
    </div>
  );
};

export default Shop;
