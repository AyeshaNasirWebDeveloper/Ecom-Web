import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart.jsx";
import { toast } from "react-toastify";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useCart();

  //Initial Details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //Get Product
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  // Add to Cart Function
  const handleAddToCart = () => {
    // Check if product is already in cart
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      toast.info("Product is already in your cart");
      return;
    }

    // Add product to cart
    setCart([...cart, { ...product, quantity: 1 }]);
    localStorage.setItem(
      "cart",
      JSON.stringify([...cart, { ...product, quantity: 1 }])
    );
    toast.success("Item added to cart");
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container my-5"
      >
        <div className="row">
          {/* Main Product Image */}
          <motion.div
            className="col-lg-6 col-md-6 mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="product-image-container">
              <img
                src={`/api/v1/products/product-photo/${product._id}`}
                className="img-fluid rounded shadow"
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-product.jpg";
                }}
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="col-lg-6 col-md-6 product-details-info"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-3">{product.name}</h2>
            <div className="mb-4">
              <h5 className="text-muted">Description</h5>
              <p className="lead">{product.description}</p>
            </div>

            <div className="d-flex align-items-center mb-4">
              <h4 className="mb-0 me-3">
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h4>
              <span className="badge bg-primary">
                {product?.category?.name}
              </span>
            </div>

            <motion.button
              className="btn btn-primary btn-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              ADD TO CART
            </motion.button>
          </motion.div>
        </div>

        {/* Similar Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            className="mt-5 similar-products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="mb-4">Similar Products</h3>
            <div className="row">
              {relatedProducts.map((p) => (
                <motion.div
                  className="col-lg-3 col-md-4 col-sm-6 mb-4"
                  key={p._id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="card h-100 shadow-sm">
                    <div className="product-thumbnail">
                      <img
                        src={`/api/v1/products/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-product.jpg";
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text text-muted">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h5">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                        <motion.button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => navigate(`/products/${p.slug}`)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          View
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default ProductDetails;
