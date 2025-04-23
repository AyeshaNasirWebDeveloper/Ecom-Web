import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
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
      const { data } = await axios.get("/api/v1/auth/orders", {
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
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
      <div className="container-fluid p-3 dashboard" style={{ minHeight: "100vh" }}>
        <div className="row g-0">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 px-3">
            <div className="d-flex flex-column" style={{ height: "calc(100vh - 100px)" }}>
              <h1 className="text-center mb-4">Your Orders</h1>
              <div className="flex-grow-1" style={{ overflowY: "auto" }}>
                {orders?.length > 0 ? (
                  orders.map((order) => (
                    <div className="card mb-3" key={order._id}>
                      <div className="card-header bg-light">
                        <div className="d-flex justify-content-between">
                          <span>Order #{order._id.substring(0, 6)}</span>
                          <span className={`badge ${
                            order.status === "deliverd" ? "bg-success" : 
                            order.status === "cancel" ? "bg-danger" : "bg-primary"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mt-2 small">
                          <span>{moment(order.createdAt).format("LLL")}</span>
                          <span>Total: $
                            {order.products.reduce(
                              (sum, p) => sum + p.price * (p.quantity || 1),
                              0
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        {order.products.map((product) => (
                          <div className="row align-items-center mb-2" key={product._id}>
                            <div className="col-3 col-md-2">
                              <img
                                src={`/api/v1/products/product-photo/${product._id}`}
                                className="img-fluid rounded"
                                alt={product.name}
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                              />
                            </div>
                            <div className="col-5 col-md-6">
                              <h6 className="mb-1">{product.name}</h6>
                              <small className="text-muted d-block">
                                Qty: {product.quantity || 1}
                              </small>
                            </div>
                            <div className="col-4 col-md-4 text-end">
                              ${(product.price * (product.quantity || 1)).toFixed(2)}
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