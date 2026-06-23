import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/authServices";

function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = async () => {
      try {
        const data = await getProfile();
        setIsAdmin(data.user.role === "admin");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

  useEffect(() => {
    checkAdmin();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return isAdmin
    ? children
    : <Navigate to="/dashboard" />;
}

export default AdminRoute;