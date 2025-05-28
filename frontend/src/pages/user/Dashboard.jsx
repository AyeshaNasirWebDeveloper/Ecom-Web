import React from "react";
import Layout from "../../components/layout/Layout.jsx";
import { useAuth } from './../../context/auth.jsx';
import UserMenu from "../../components/layout/UserMenu.jsx";

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={"Dashboard"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 mt-5">
              <h3>
                User Name: {auth?.user?.name}
              </h3>
              <h3>
                User Email: {auth?.user?.email}
              </h3>
              <h3>
                User Contact: {auth?.user?.phone}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
