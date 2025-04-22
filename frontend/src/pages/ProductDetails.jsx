import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //Initial Details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //Get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container m-5">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <img
              src={`/api/v1/products/product-photo/${product._id}`}
              className="card-img-top img-fluid "
              alt={product.name}
              height="150"
              width={"150px"}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 product-details-info">
            {/* <h1 className="text-center">Product Details</h1>
          <hr /> */}
            <h3>{product.name}</h3>
            <h6>Description : </h6>
            <p>{product.description}</p>
            <h6>
              Price :{" "}
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
            <h6>Category : {product?.category?.name}</h6>
            <button class="btn btn-secondary ms-1">ADD TO CART</button>
          </div>
        </div>
      </div>
      <hr />
      <div className="container similar-products">
        <div className="row">
          <h4>Similar Products ➡️</h4>
          {relatedProducts.length < 4 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top img-fluid"
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
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/products/${p.slug}`)}
                    >
                      More Details
                    </button>
                    {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
