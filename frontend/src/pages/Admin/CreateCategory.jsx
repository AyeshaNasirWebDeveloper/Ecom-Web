import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";

const CreateCategory = () => {
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Category</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
