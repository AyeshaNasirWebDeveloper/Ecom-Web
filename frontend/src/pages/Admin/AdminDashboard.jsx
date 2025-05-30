import Layout from "../../components/layout/Layout.jsx";
import AdminMenu from "../../components/layout/AdminMenu.jsx";
import { useAuth } from './../../context/auth.jsx';

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 mt-5">
              <h3>
                Admin Name: {auth?.user?.name}
              </h3>
              <h3>
                Admin Email: {auth?.user?.email}
              </h3>
              <h3>
                Admin Contact: {auth?.user?.phone}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
