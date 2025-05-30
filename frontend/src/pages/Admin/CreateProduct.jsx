import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout.jsx";
import AdminMenu from "../../components/layout/AdminMenu.jsx";
import { toast } from "react-toastify";
import axios from '../../utils/axios.js';
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

// create product
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);

  //Get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      // console.log(data)
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create function of product
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate required fields
      if (!name || !description || !price || !quantity || !category || !photo) {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }

      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        "/api/v1/products/create-product",
        productData
      );
      //  checking
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Product creation failed");
      }
    } catch (error) {
      console.error("Creation error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong in product creation"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                // bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
               */}
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  onClick={handleCreate}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "CREATE PRODUCT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
