import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Cart from "./pages/cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import ProductDetail from "./pages/ProductDetail";
import { AppProvider } from "./context/AppProvider";
import MyOrders from "./pages/MyOrders";

// Admin
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import ProductsAdd from "./admin/pages/ProductsAdd";
import UpdateProductForm from "./admin/pages/UpdateProductForm";
import Customers from "./admin/pages/Customers";
import SiteReviews from "./admin/pages/SiteReviews";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes>

        {/* CLIENT SITE */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="myorders" element={<MyOrders />} />
        </Route>

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="productsadd" element={<ProductsAdd />} />
          <Route path="/admin/updateproductform/:id" element={<UpdateProductForm />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reviews" element={<SiteReviews />} />
        </Route>


      </Routes>
    </AppProvider>
  );
};

export default App;
