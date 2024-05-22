import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element: Component }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await axios.get("http://localhost:5000/api/checkAuth", {
          withCredentials: true,
        });
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
        if (error.response && error.response.status === 401) {
          toast.error("Authentication error. Please log in again.", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      }
    })();
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <Component /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
