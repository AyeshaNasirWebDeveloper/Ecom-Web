import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";
import { toast } from "react-toastify";
import SearchInput from "./../Form/SearchInput.jsx";
import useCategory from "./../hooks/useCategory.jsx";
import { useCart } from "../../context/cart.jsx";
import { Badge } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

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
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon " />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 E-Commerce
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link navi">
                  Home
                </NavLink>
              </li>

              {/* Category Dropdown */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Condions using ternary operators */}
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link navi">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link navi">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="nav-link navi"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="nav-link navi"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item"></li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link navi">
                  <Badge
                    count={cart?.length}
                    showZero
                    offset={[10, -5]}
                    style={{ backgroundColor: "#52c41a" }}
                  >
                    <ShoppingOutlined style={{ fontSize: '22px' }} />
                  </Badge>
                </NavLink>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
