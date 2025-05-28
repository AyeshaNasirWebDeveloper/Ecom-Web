import React, { useState } from "react";
import Layout from "../components/layout/Layout.jsx";
import { useCart } from "../context/cart.jsx";
import { useAuth } from "../context/auth.jsx";
import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  // const [instance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Update product quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // If quantity is 0, remove the item from cart
      removeCartItem(productId);
      return;
    }

    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = cart.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
      );
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const myCart = cart.filter((item) => item._id !== pid);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  // Get payment gateway token
  // const getToken = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/products/braintree/token");
  //     setClientToken(data?.clientToken);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to initialize payment");
  //   }
  // };

  // useEffect(() => {
  //   if (auth?.token) {
  //     getToken();
  //   }
  // }, [auth?.token]);

  // Handle payment
  // const handlePayment = async () => {
  //   try {
  //     if (!instance) {
  //       toast.error("Payment gateway is not ready");
  //       return;
  //     }

  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     await axios.post("/api/v1/products/braintree/payment", {
  //       nonce,
  //       cart,
  //     });

  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/user/orders");
  //     toast.success("Payment completed successfully!");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(
  //       error.response?.data?.message || "Payment failed. Please try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // cart checkout
  const handleCheckout = async () => {
    try {
      setLoading(true);

      // Validate cart before sending
      if (!cart || cart.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const { data } = await axios.post(
        "/api/v1/auth/checkout",
        {
          cart: cart.map((item) => ({
            _id: item._id,
            price: item.price,
            quantity: item.quantity || 1,
          })),
        }
      );

      // Clear cart after successful order
      localStorage.removeItem("cart");
      setCart([]);

      // Redirect to orders page
      navigate("/dashboard/user/orders");
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="cart-page container">
        <div className="row">
          <div className="col-12">
            <div className="cart-header p-2 mb-3 text-center bg-light">
              <h1>
                {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
              </h1>
              <p className="mb-0">
                {cart?.length
                  ? `You have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout!"
                    }`
                  : "Your cart is empty"}
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {/* Cart Items Column */}
            <div className="col-lg-7 col-md-12 mb-4">
              {cart?.map((product) => (
                <div className="card mb-3" key={product._id}>
                  <div className="row g-0 align-items-center">
                    <div className="col-md-4 text-center">
                      <img
                        src={`/api/v1/products/product-photo/${product._id}`}
                        className="img-fluid product-image"
                        alt={product.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text text-muted">
                              {product.description.substring(0, 30)}...
                            </p>
                          </div>
                          <p className="card-text text-end">
                            <small className="text-muted">
                              ${product.price}
                            </small>
                          </p>
                        </div>
                        <div className="quantity-control d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                              updateQuantity(
                                product._id,
                                (product.quantity || 1) - 1
                              )
                            }
                          >
                            -
                          </button>
                          <span className="mx-2">{product.quantity || 1}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                              updateQuantity(
                                product._id,
                                (product.quantity || 1) + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Column */}
            <div className="col-lg-5 col-md-12">
              <div className="card summary-card">
                <div className="card-body">
                  <h2 className="card-title">Cart Summary</h2>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Total:</h4>
                    <h5 className="mb-0">{totalPrice()}</h5>
                  </div>

                  {auth?.user?.address ? (
                    <div className="mb-3 mt-3">
                      <h5>Current Address</h5>
                      <p className="text-muted">{auth.user.address}</p>
                      <button
                        className="btn btn-outline-success w-100"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </div>
                  ) : (
                    <div className="mb-3 mt-3">
                      {auth?.token ? (
                        <button
                          className="btn btn-outline-warning w-100"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-warning w-100"
                          onClick={() => navigate("/login", { state: "/cart" })}
                        >
                          Please Login to checkout
                        </button>
                      )}
                    </div>
                  )}

                  {/* {clientToken && auth?.token && cart?.length > 0 && (
                    <div className="payment-section">
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing..." : "Make Payment"}
                      </button>
                    </div>
                  )} */}
                  {/* {!clientToken && auth?.token && cart?.length > 0 && (
                    <button
                      className="btn btn-success w-100 mt-3"
                      onClick={handleCheckout}
                      disabled={loading || !auth?.user?.address}
                    >
                      {loading ? "Placing..." : "Proceed to Checkout"}
                    </button>
                  )} */}
                  {/* {auth?.token && cart?.length > 0 && (
                    <div className="d-flex flex-column gap-2">
                      {clientToken && (
                        <div className="payment-section">
                          <DropIn
                            options={{
                              authorization: clientToken,
                              paypal: { flow: "vault" },
                            }}
                            onInstance={(instance) => setInstance(instance)}
                          />
                          <button
                            className="btn btn-primary w-100"
                            onClick={handlePayment}
                            disabled={
                              loading || !instance || !auth?.user?.address
                            }
                          >
                            {loading ? "Processing..." : "Pay with Card"}
                          </button>
                        </div>
                      )}
                      <button
                        className="btn btn-success w-100"
                        onClick={handleCheckout}
                        disabled={loading || !auth?.user?.address}
                      >
                        {loading ? "Placing..." : "Cash on Delivery"}
                      </button>
                    </div>
                  )} */}
                  {auth?.token && cart?.length > 0 && (
                    <button
                      className="btn btn-success w-100"
                      onClick={handleCheckout}
                      disabled={loading || !auth?.user?.address}
                    >
                      {loading ? "Placing Order..." : "Cash on Delivery"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
