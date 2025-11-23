import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import UserIcon from "../../../public/images/user.svg";
import CartIcon from "../../../public/images/cart.svg";
import { AppContext } from "../../context/AppContext";

const Header: React.FC = () => {
  const { isLoggedIn, customer, login, logout } = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginMessage, setLoginMessage] = useState("");

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginMessage("");
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm.username, loginForm.password);
      setIsLoginModalOpen(false);
    } catch (err) {
      setLoginMessage((err as Error).message);
    }
  };

  return (
    <>
      <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/" onClick={() => setIsOpen(false)}>
            CozyNest
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-expanded={isOpen}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>Anasayfa</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shop">Ürünler</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">Hakkımızda</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">İletişim</NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-3 align-items-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <img src={CartIcon} alt="Cart" width={24} height={24} />
                </NavLink>
              </li>

             {isLoggedIn ? (
                <li
                  className="nav-item user-dropdown"
                  style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <img src={UserIcon} alt="User" width={24} height={24} />
                  <button
                    className="nav-link btn p-0"
                    onClick={toggleDropdown}
                    style={{ background: "transparent", border: "none", color: "#fff", fontWeight: 600 }}
                  >
                    Hoşgeldiniz, {customer?.username} ▾
                  </button>


                  {isDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "40px",
                        right: 0,
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        padding: "0.5rem 1rem",
                      }}
                    >
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        style={{ border: "none", background: "transparent", cursor: "pointer" }}
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </li>
              ) : (
                <li className="nav-item">
                 <button className="nav-link btn-link p-0" onClick={openLoginModal} > <img src={UserIcon} alt="User" width={24} height={24} />                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
          onClick={closeLoginModal}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              width: "400px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeLoginModal} style={{ position: "absolute", top: 10, right: 10, border: "none", background: "transparent", fontSize: "1.5rem" }}>
              ×
            </button>

            <h3 className="text-center mb-3">Hesabınıza Giriş Yapın</h3>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Kullanıcı Adı"
                className="form-control mb-3"
                value={loginForm.username}
                onChange={handleLoginChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Parola"
                className="form-control mb-3"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
              <button type="submit" className="btn btn-primary w-100">
                Giriş Yap
              </button>
            </form>

            {loginMessage && <p className="mt-3 text-danger text-center">{loginMessage}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
