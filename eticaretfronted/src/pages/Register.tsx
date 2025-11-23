import React, { useState } from "react";
import axios from "axios";

interface RegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({}); // Hata mesajları
  const [showPassword, setShowPassword] = useState(false); // Şifre göster/gizle
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null); // Kullanıcı adı uygun mu?
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null); // E-posta uygun mu?

  // Input değişimlerini yönet
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Telefon sadece rakam ve max 10 karakter
    if (name === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Anlık kullanıcı adı kontrolü
    if (name === "username" && value.trim()) {
      try {
        const res = await axios.get(`http://localhost:8080/api/customers/check-username/${value}`);
        setUsernameAvailable(res.data.available);
      } catch {
        setUsernameAvailable(null);
      }
    }

    // Anlık e-posta kontrolü
    if (name === "email" && value.trim()) {
      try {
        const res = await axios.get(`http://localhost:8080/api/customers/check-email/${value}`);
        setEmailAvailable(res.data.available);
      } catch {
        setEmailAvailable(null);
      }
    }
  };

  // Form validation
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Ad zorunludur.";
    if (!formData.lastName.trim()) newErrors.lastName = "Soyad zorunludur.";
    if (!formData.username.trim()) newErrors.username = "Kullanıcı adı zorunludur.";
    if (usernameAvailable === false) newErrors.username = "Bu kullanıcı adı alınmış!";
    if (!formData.email.trim()) newErrors.email = "E-posta zorunludur.";
    if (emailAvailable === false) newErrors.email = "Bu e-posta kayıtlı!";
    if (formData.password.length < 6) newErrors.password = "Şifre en az 6 karakter olmalı.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Şifreler eşleşmiyor.";
    if (formData.phone && formData.phone.length > 10) newErrors.phone = "Telefon en fazla 10 rakam olmalı.";
    return newErrors;
  };

// 🔹 Kayıt işlemi
const handleRegister = async () => {
  // 1. Form validasyonu yap
  const validationErrors = validate();
  
  // 2. Hata varsa state'e set et ve kaydı durdur
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    // 3. API’ye form verilerini gönder
    await axios.post("http://localhost:8080/api/customers/register", formData);

    // 4. Başarılı kayıt mesajı göster
    alert("Kayıt başarılı!");

    // 5. Formu temizle
    setFormData({ 
      firstName: "", lastName: "", username: "", email: "", phone: "", password: "", confirmPassword: "" 
    });

    // Hata mesajlarını sıfırla
    setErrors({});

    // 7. Kullanıcı adı ve e-posta kontrol durumlarını sıfırla
    setUsernameAvailable(null);
    setEmailAvailable(null);

  } catch (error: unknown) {
    // Hata yönetimi
    if (axios.isAxiosError(error)) {
      // Axios hatası → sunucudan gelen mesajı göster
      alert(error.response?.data || "Sunucu hatası!");
    } else if (error instanceof Error) {
      // JS hatası → error.message göster
      alert(error.message);
    } else {
      // Bilinmeyen hata
      alert("Bilinmeyen bir hata oluştu!");
    }
  }
};


  return (
    <div className="product-section">
      <div className="container-fluid shop-container">
        <div className="d-flex justify-content-center align-items-center bg-light mb-3">
          <div className="card shadow-lg border-0" style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }}>
            <div className="card-body p-4">
              <h2 className="text-center mb-4 fw-semibold text-dark">Üye Ol</h2>

              <div className="row">
                <div className="col-6 mb-3">
                  <input
                    type="text"
                    name="firstName"
                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                    placeholder="Ad *"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>
                <div className="col-6 mb-3">
                  <input
                    type="text"
                    name="lastName"
                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                    placeholder="Soyad *"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
              </div>

              <input
                type="text"
                name="username"
                className={`form-control mb-3 ${errors.username ? "is-invalid" : ""}`}
                placeholder="Kullanıcı Adı *"
                value={formData.username}
                onChange={handleChange}
              />
              {usernameAvailable === true && <small className="text-success">Kullanıcı adı uygun ✅</small>}
              {usernameAvailable === false && <small className="text-danger">Kullanıcı adı alınmış ❌</small>}
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}

              <input
                type="email"
                name="email"
                className={`form-control mb-3 ${errors.email ? "is-invalid" : ""}`}
                placeholder="E-posta *"
                value={formData.email}
                onChange={handleChange}
              />
              {emailAvailable === true && <small className="text-success">E-posta uygun ✅</small>}
              {emailAvailable === false && <small className="text-danger">E-posta kayıtlı ❌</small>}
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}

              <div className="input-group mb-3">
                <span className="input-group-text">📞</span>
                <input
                  type="tel"
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="Telefon"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              <div className="input-group mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Şifre *"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? "Gizle" : "Göster"}
                </button>
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className={`form-control mb-3 ${errors.confirmPassword ? "is-invalid" : ""}`}
                placeholder="Şifre Tekrar *"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}

              <button className="btn btn-primary w-100 fw-semibold py-2 mt-2" onClick={handleRegister}>
                Kayıt Ol
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
