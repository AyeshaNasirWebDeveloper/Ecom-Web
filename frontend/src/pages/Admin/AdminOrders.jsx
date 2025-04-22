import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import { useAuth } from "../../context/auth.jsx";
import moment from "moment";
import { Select, Spin } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel"
  ]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/all-orders", {
        headers: {
          Authorization: `Bearer ${auth?.token}`
        }
      });
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleStatusChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/auth/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        }
      );
      toast.success("Order status updated");
      getOrders(); // Refresh orders after update
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <Layout title={"All Orders Data"}>
        <div className="text-center mt-5">
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.length === 0 ? (
            <div className="text-center mt-5">
              <h4>No orders found</h4>
            </div>
          ) : (
            orders?.map((order, index) => (
              <div className="border shadow mb-4" key={order._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleStatusChange(order._id, value)}
                          defaultValue={order?.status}
                          style={{ width: 150 }}
                        >
                          {status.map((statusItem, i) => (
                            <Option key={i} value={statusItem}>
                              {statusItem}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createdAt).fromNow()}</td>
                      <td>
                        {order?.payment?.success ? (
                          <span className="text-success">Success</span>
                        ) : (
                          <span className="text-danger">Failed</span>
                        )}
                      </td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {order?.products?.map((product) => (
                    <div className="row mb-2 p-3 card flex-row" key={product._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${product._id}`}
                          className="card-img-top"
                          alt={product.name}
                          width="100px"
                          height="100px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-8">
                        <h5>{product.name}</h5>
                        <p>{product.description?.substring(0, 50)}...</p>
                        <p>Price: ${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;