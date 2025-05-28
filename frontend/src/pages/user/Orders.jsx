import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu.jsx";
import Layout from "../../components/layout/Layout.jsx";
import axios from '../../utils/axios.js';
import { useAuth } from "../../context/auth.jsx";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      // Ensure we're using the correct data structure
      setOrders(data?.orders || []);
    } catch (error) {
      console.error("Orders error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    } else {
      setLoading(false);
    }
  }, [auth?.token]);

  if (loading) {
    return (
      <Layout title={"Your Orders"}>
        <div className="container-fluid p-3 dashboard">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={"Your Orders"}>
      <div
        className="container-fluid p-3 dashboard"
        style={{ minHeight: "100vh" }}
      >
        <div className="row g-0">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 px-3">
            <div
              className="d-flex flex-column"
              style={{ height: "calc(100vh - 100px)" }}
            >
              <h1 className="text-center mb-4">Your Orders</h1>
              <div className="flex-grow-1" style={{ overflowY: "auto" }}>
                {orders?.length > 0 ? (
                  orders.map((order) => (
                    <div className="card mb-3" key={order._id}>
                      <div className="card-header bg-light">
                        <div className="d-flex justify-content-between">
                          <span>Order #{order._id.substring(0, 6)}</span>
                          <span
                            className={`badge ${
                              order.status === "Not Process"
                                ? "bg-dark"
                                : order.status === "Processing"
                                ? "bg-warning text-dark"
                                : order.status === "Shipped"
                                ? "bg-primary"
                                : order.status === "Delivered"
                                ? "bg-success"
                                : order.status === "Cancel"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mt-2 small">
                          <span>{moment(order.createdAt).format("LLL")}</span>
                          <span>Total: ${order.totalAmount?.toFixed(2) || "0.00"}</span>
                        </div>
                      </div>
                      <div className="card-body">
                        {order.products?.map((p) => (
                          <div
                            className="row align-items-center mb-2"
                            key={p.product?._id || p._id}
                          >
                            <div className="col-3 col-md-2">
                              <img
                                src={`/api/v1/products/product-photo/${
                                  p.product?._id || p._id
                                }`}
                                className="img-fluid rounded"
                                alt={p.product?.name || p.name}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://static-01.daraz.pk/p/39b2f8c5c03f999c95a61c4766889298.jpg"; // Add a default image
                                }}
                              />
                            </div>
                            <div className="col-5 col-md-6">
                              <h6 className="mb-1">
                                {p.product?.name || p.name}
                              </h6>
                              <small className="text-muted d-block">
                                Qty: {p.quantity || 1}
                              </small>
                              <small className="text-muted">
                                ${p.price?.toFixed(2) || "0.00"} each
                              </small>
                            </div>
                            <div className="col-4 col-md-4 text-end">
                              ${((p.price || 0) * (p.quantity || 1)).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5">
                    <h4>No orders found</h4>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => navigate("/")}
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
