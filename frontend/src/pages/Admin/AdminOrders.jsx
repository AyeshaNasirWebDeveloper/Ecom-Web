import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminMenu from "../../components/layout/AdminMenu.jsx";
import Layout from "../../components/layout/Layout.jsx";
import { useAuth } from "../../context/auth.jsx";
import moment from "moment";
import { Select, Spin, Table, Card, Image, Typography, Badge } from "antd";
import "../../styles/AdminOrders.css"

const { Option } = Select;
const { Text } = Typography;

// Define status options outside component to prevent recreation on each render
const STATUS_OPTIONS = [
  "Not Process",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancel",
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data?.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleStatusChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, { status: value });
      toast.success("Order status updated");
      getOrders(); // Refresh the orders list
    } catch (error) {
      console.error("Update status error:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (currentStatus, record) => (
        <Select
          value={currentStatus}
          onChange={(value) => handleStatusChange(record._id, value)}
          style={{ width: 150 }}
        >
          {STATUS_OPTIONS.map(option => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Buyer',
      dataIndex: ['buyer', 'name'],
      key: 'buyer',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: date => moment(date).fromNow(),
    },
    {
      title: 'Payment',
      dataIndex: ['payment', 'success'],
      key: 'payment',
      render: success => (
        <Badge 
          status={success ? 'success' : 'error'} 
          text={success ? 'Success' : 'Failed'} 
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'products',
      key: 'quantity',
      render: products => products?.length || 0,
    },
  ];

  if (loading) {
    return (
      <Layout title="All Orders">
        <div className="text-center mt-5">
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="All Orders">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center my-4">Order Details</h1>
            {orders.length === 0 ? (
              <Card>
                <div className="text-center p-5">
                  <h4>No orders found</h4>
                </div>
              </Card>
            ) : (
              <Table
                columns={columns}
                dataSource={orders}
                rowKey="_id"
                expandable={{
                  expandedRowRender: record => (
                    <div className="p-3">
                      <h5>Products</h5>
                      {record.products.map(product => (
                        <Card key={product._id} className="mb-3">
                          <div className="row align-items-center">
                            <div className="col-md-2">
                              <Image
                                src={`/api/v1/products/product-photo/${product._id}`}
                                width={80}
                                height={80}
                                alt={product.name}
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                            <div className="col-md-6">
                              <Text strong>{product.name}</Text>
                              <Text type="secondary" ellipsis>
                                {product.description?.substring(0, 50)}...
                              </Text>
                              <div className="mt-2">
                                <Text>Price: ${product.price}</Text>
                                <Text className="ms-3">Qty: {product.quantity || 1}</Text>
                              </div>
                            </div>
                            <div className="col-md-4 text-end">
                              <Text strong>
                                ${(product.price * (product.quantity || 1)).toFixed(2)}
                              </Text>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;