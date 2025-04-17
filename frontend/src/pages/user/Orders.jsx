import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

const Orders = () => {
  return (
    <Layout title={"Your Orders"}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <h1>Your Orders</h1>
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default Orders;
