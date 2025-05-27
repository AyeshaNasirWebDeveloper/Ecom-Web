import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";
import { toast } from "react-toastify";
import SearchInput from "../Form/SearchInput.jsx";
import useCategory from "../hooks/useCategory.jsx";
import { useCart } from "../../context/cart.jsx";
import { Badge } from "antd";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import "../../styles/Header.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully!");
  };

  // React Router v6 NavLink style function
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? 'white' : 'rgba(255, 255, 255, 0.9)',
      background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
    };
  };

  return (
    <header className="header-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">E-Commerce</span>
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="search-container">
              <SearchInput />
            </div>
            
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" style={navLinkStyles}>
                  Home
                </NavLink>
              </li>

              {/* Categories Dropdown */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/categories">
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Auth Links */}
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" style={navLinkStyles}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" style={navLinkStyles}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle user-menu"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={navLinkStyles}
                  >
                    <UserOutlined className="user-icon" />
                    <span className="user-name">{auth?.user?.name}</span>
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              {/* Cart */}
              <li className="nav-item cart-item">
                <NavLink to="/cart" className="nav-link cart-link" style={navLinkStyles}>
                <ShoppingOutlined className="cart-icon" />
                  <Badge
                    count={cart?.length}
                    showZero
                    offset={[10, -5]}
                    className="cart-badge"
                  >
                    <span className="cart-text text-light">Cart</span>
                  </Badge>
                  
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;