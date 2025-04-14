import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const Login = () => {
  // State Management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth()

  // using hook
  const navigate = useNavigate();
  const location = useLocation()

  // Form Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/login`,
        { email, password }
      ); // Sending network request
      if (res.data.success) {
        toast.success(res.data.message || "Login Successfully!");
        setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
        })
        // localStorage.setItem('auth', JSON.stringify(res.data))
        // navigate(location.state || "/");
        const redirectPath = location.state?.from || "/dashboard"; // fallback if no original path
        navigate(redirectPath);
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        toast.error(error.response.data.message || "Registration failed");
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request
        toast.error("Error in registration. Please check your connection.");
      }
    }
  };

  return (
    <>
      <Layout title={"Login"}>
        <section className="vh-25" style={{ backgroundColor: "#eee" }}>
          <div className="container h-50">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: 25 }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Login
                        </p>
                        <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                            <div
                              data-mdb-input-init
                              className="form-outline flex-fill mb-0"
                            >
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                className="form-control"
                                placeholder="Enter your Email"
                                required
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw" />
                            <div
                              data-mdb-input-init
                              className="form-outline flex-fill mb-0 me-2"
                            >
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                className="form-control"
                                placeholder="Enter Password"
                                required
                              />
                            </div>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 ">
                            <button
                              type="submit"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-dark btn me-5"
                              onClick={() => {navigate('/forgot-password')}}
                            >
                              Forgot Password?
                            </button>
                            <button
                              type="submit"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-dark btn"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://i.pinimg.com/originals/db/36/b9/db36b9d47c541fa374ae33e0c244f113.gif"
                          className="img-fluid w-100"
                          alt="Register"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Login;
