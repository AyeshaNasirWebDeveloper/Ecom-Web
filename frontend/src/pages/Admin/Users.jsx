import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import { Table, Tag, Space, Avatar, Badge } from "antd";
import moment from "moment";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all users
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/all-users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // AntD Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === 1 ? "red" : "blue"}>
          {role === 1 ? "Admin" : "User"}
        </Tag>
      ),
      filters: [
        { text: "Admin", value: 1 },
        { text: "User", value: 0 },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("LL"),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Space size="middle">
          <Badge 
            status={record.active ? "success" : "error"} 
            text={record.active ? "Active" : "Inactive"} 
          />
        </Space>
      ),
    },
  ];

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Users</h1>
            <Table
              columns={columns}
              dataSource={users}
              rowKey={(record) => record._id}
              loading={loading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: true }}
              bordered
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;