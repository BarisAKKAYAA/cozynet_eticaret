import React, { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext";

const ContactPage: React.FC = () => {
  // Giriş yapmış kullanıcının bilgilerini almak için context
  const { customer } = useContext(AppContext);

  // Form verilerini tutan state
  const [formData, setFormData] = useState({
    customerName: customer?.username || "",
    email: customer?.email || "",
    comment: "",
    rating: 0,
  });

  // Form input değişikliklerini yönetir
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kullanıcının yıldız puanlamasını ayarlar
  const handleRating = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  // Form gönderildiğinde çalışır
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Giriş kontrolü
    if (!customer) {
      toast.error("Yorum göndermek için giriş yapmalısınız!");
      return;
    }

    // Puan seçimi kontrolü
    if (formData.rating === 0) {
      toast.error("Lütfen bir puan seçin!");
      return;
    }

    try {
      // Yorum API isteği
      await axios.post(
        `http://localhost:8080/api/sitereviews/customer/${customer.id}`,
        {
          comment: formData.comment,
          rating: formData.rating,
        }
      );
      toast.success("Yorumunuz başarıyla gönderildi!");
      setFormData({ ...formData, comment: "", rating: 0 }); // formu sıfırla
    } catch (err) {
      toast.error("Yorum gönderilirken bir hata oluştu!");
      console.error(err);
    }
  };

  return (
    <div className="product-section">
      <div className="container py-5">
        {/* Toast bildirim alanı */}
        <ToastContainer />

        {/* İletişim bilgileri bölümü */}
        <div className="col-md-8 col-lg-8 pb-4 mx-auto">
          <div className="row mb-5 text-center">
            <div className="row mb-5">

              {/* Adres */}
              <div className="col-lg-4">
                <div className="service no-shadow align-items-center link horizontal d-flex active">
                  <div className="service-icon color-1 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                    </svg>
                  </div>
                  <div className="service-contents">
                    <p>CozyNet Ordu Şubesi</p>
                  </div>
                </div>
              </div>

              {/* E-posta */}
              <div className="col-lg-4">
                <div className="service no-shadow align-items-center link horizontal d-flex active">
                  <div className="service-icon color-1 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555z"></path>
                    </svg>
                  </div>
                  <div className="service-contents">
                    <p>barisakkaya@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Telefon */}
              <div className="col-lg-4">
                <div className="service no-shadow align-items-center link horizontal d-flex active">
                  <div className="service-icon color-1 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                    </svg>
                  </div>
                  <div className="service-contents">
                    <p>545 249 8350</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kullanıcı yorumu formu */}
        <div className="text-center mb-4">
          <h2>Site Hakkındaki Görüşünüzü Bildirin</h2>
          <p>Deneyiminizi paylaşarak gelişmemize yardımcı olun 🌟</p>
        </div>

        <form onSubmit={handleSubmit} className="col-lg-8 mx-auto">
          {/* Ad Soyad */}
          <div className="form-group mb-3">
            <label className="text-black">Ad Soyad</label>
            <input
              type="text"
              className="form-control"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              disabled
            />
          </div>

          {/* E-posta */}
          <div className="form-group mb-3">
            <label className="text-black">E-posta</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>

          {/* Yorum */}
          <div className="form-group mb-3">
            <label className="text-black">Yorumunuz</label>
            <textarea
              className="form-control"
              name="comment"
              rows={5}
              value={formData.comment}
              onChange={handleChange}
              required
            />
          </div>

          {/* Puanlama (yıldızlar) */}
          <div className="form-group mb-4 text-center">
            <label className="text-black d-block mb-2">Puanınız</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  cursor: "pointer",
                  fontSize: "1.8rem",
                  color: "#ffc107",
                  marginRight: "5px",
                }}
                onClick={() => handleRating(star)}
              >
                {/* Dolu yıldız = ★ , Boş yıldız = ☆ */}
                {formData.rating >= star ? "★" : "☆"}
              </span>
            ))}
          </div>

          {/* Gönder butonu */}
          <button type="submit" className="btn btn-primary w-100">
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
