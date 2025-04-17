import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth", {
          headers: {
            Authorization: auth?.token,
          },
        });
  
        // console.log("Auth Check Response:", res.data);
  
        if (res.data?.ok) {
          setOk(true);
        } else {
          setOk(false);
          window.location.href = '/';
        }
      } catch (error) {
        console.error("Auth Check Failed:", error);
        setOk(false);
        window.location.href = '/';
      }
    };
  
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  
  return ok ? <Outlet /> : <Spinner path="/" />;
}
