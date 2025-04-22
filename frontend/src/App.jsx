import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import PrivateRoute from "./components/Routes/Private.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import AdminRoute from "./components/Routes/Admin.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import Users from "./pages/Admin/Users.jsx";
import Orders from "./pages/user/Orders.jsx";
import Profile from "./pages/user/Profile.jsx";
import Products from "./pages/Admin/Products.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import Search from "./pages/Search.jsx";
import CategoryProduct from './pages/CategoryProduct.jsx';
import CartPage from './pages/CartPage.jsx';
import Categories from './pages/Categories.jsx';
import ProductDetails from "./pages/ProductDetails.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />

        {/* User Routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
