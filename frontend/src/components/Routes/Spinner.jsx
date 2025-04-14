import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth"; 

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  const [auth] = useAuth(); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => {
        if (prevValue <= 1) {
          clearInterval(interval); // Stop the countdown
  
          // Only redirect if not logged in
          if (!auth?.token) {
            navigate("/login", {
              state: { from: location.pathname },
            });
          }
  
          return 0;
        }
  
        return prevValue - 1;
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, [auth?.token, navigate, location]);
  

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="text-center">Redirecting you in {count} seconds</h1>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
