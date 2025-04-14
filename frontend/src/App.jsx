import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import PrivateRoute from "./components/Routes/Private.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
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
