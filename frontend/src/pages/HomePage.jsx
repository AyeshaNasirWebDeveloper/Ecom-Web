import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio, Carousel } from "antd";
import { Prices } from "../components/Prices.jsx";
import { useCart } from "../context/cart.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "@/components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import { motion } from "framer-motion";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Sample carousel images (replace with your actual image URLs)
  const carouselImages = [
    "https://static.vecteezy.com/system/resources/previews/002/453/533/non_2x/big-sale-discount-banner-template-promotion-illustration-free-vector.jpg",
    "https://img.freepik.com/premium-vector/special-offer-final-sale-banner-red-background-illustration_275806-121.jpg",
    "https://img.freepik.com/free-vector/horizontal-banner-template-black-friday-sales_23-2150867247.jpg?semt=ais_hybrid&w=740",
  ];

  //get all categories
  const getAllCategory = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  //get products
  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts((prev) =>
        page === 1 ? data.products : [...prev, ...data.products]
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]);

  //getTotal Count
  const getTotal = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //load more
  const loadMore = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts((prev) => [...prev, ...(data?.products || [])]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  // filter by category
  const handleFilter = useCallback((value, id) => {
    setChecked((prev) => {
      const all = [...prev];
      if (value) {
        all.push(id);
      } else {
        return all.filter((c) => c !== id);
      }
      return all;
    });
  }, []);

  //getting filtered products
  const filterProduct = useCallback(async () => {
    try {
      const { data } = await axios.post("/api/v1/products/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }, [checked, radio]);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, [getAllCategory, getTotal]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page, loadMore]);

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length, getAllProducts]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio, filterProduct]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Layout title={"All Products - Best offers"}>
      {/* Carousel Slider */}
      <div className="carousel-outer-container">
        <div className="responsive-carousel">
          <Carousel
            autoplay
            effect="fade"
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {carouselImages.map((img, index) => (
              <div key={`carousel-${index}`}>
                <div className="slide-container">
                  <img
                  className={"img-fluid"}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://img.freepik.com/premium-vector/mega-sale-banner-with-red-ribbon-illustration_275806-126.jpg";
                    }}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <motion.div
        className="container-fluid row home-page"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="col-md-3 filters" variants={itemVariants}>
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={`category-${c._id}`}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p, index) => (
                <div key={`price-${index}`}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column mt-3">
            <button
              className="btn btn-danger"
              onClick={() => {
                setChecked([]);
                setRadio([]);
                setPage(1);
              }}
            >
              RESET FILTERS
            </button>
          </div>
        </motion.div>

        <motion.div className="col-md-9" variants={itemVariants}>
          <h1 className="text-center mb-4">All Products</h1>
          <motion.div
            className="d-flex flex-wrap justify-content-center"
            variants={containerVariants}
          >
            {products?.map((p) => (
              <motion.div
                className="card m-2 product-card"
                key={`product-${p._id}`}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/products/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added Successfully!");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {products && products.length < total && (
            <motion.div className="m-2 p-3 text-center" variants={itemVariants}>
              <button
                className="btn btn-primary loadmore"
                onClick={() => setPage(page + 1)}
                disabled={loading}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    Load more <AiOutlineReload />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default HomePage;
