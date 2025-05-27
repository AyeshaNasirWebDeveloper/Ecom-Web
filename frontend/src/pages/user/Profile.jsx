import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import { useAuth } from "../../context/auth.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        setLoading(false)
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <Layout title={"Profile"}>
      <section className="vh-65" style={{ backgroundColor: "#eee" }}>
        <div className="container m-3 p-3 dashboard">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                  <div className="card text-black" style={{ borderRadius: 25 }}>
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                            Profile Details
                          </p>
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                          <form
                            onSubmit={handleSubmit}
                            className="mx-1 mx-md-4"
                          >
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw" />
                              <div
                                data-mdb-input-init
                                className="form-outline flex-fill mb-0"
                              >
                                <input
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  id="name"
                                  className="form-control"
                                  placeholder="Enter Your Name"
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                              <div
                                data-mdb-input-init
                                className="form-outline flex-fill mb-0"
                              >
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  id="email"
                                  className="form-control"
                                  placeholder="Enter your Email"
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw" />
                              <div
                                data-mdb-input-init
                                className="form-outline flex-fill mb-0 me-2"
                              >
                                <input
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  id="password"
                                  className="form-control"
                                  placeholder="Enter Password"
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                              <div
                                data-mdb-input-init
                                className="form-outline flex-fill mb-0"
                              >
                                <input
                                  type="number"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  id="phone"
                                  className="form-control"
                                  placeholder="Enter your Phone Number"
                                />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                              <div
                                data-mdb-input-init
                                className="form-outline flex-fill mb-0"
                              >
                                <input
                                  type="text"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  id="address"
                                  className="form-control"
                                  placeholder="Enter your Address"
                                />
                              </div>
                            </div>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button
                                type="submit"
                                data-mdb-button-init
                                data-mdb-ripple-init
                                className="btn btn-dark btn"
                                disabled={loading}
                              >
                                {loading ? "Updating..." : "Update Now"}
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                          <img
                            src="https://i.pinimg.com/originals/db/36/b9/db36b9d47c541fa374ae33e0c244f113.gif"
                            className="img-fluid w-100"
                            alt="Register"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
