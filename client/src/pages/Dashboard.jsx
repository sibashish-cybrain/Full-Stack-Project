import { useEffect, useState } from "react";
import { getProfile, logoutUser } from "../Services/authServices";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div className="dashboard-container">
    <h1 className="dashboard-title"> Dashboard </h1>

    {user ? (
      <div className="card profile-card">

        <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h2>Welcome, {user.name} 👋</h2>

        <p> <strong>Name:</strong> {user.name} </p>
        <p> <strong>Email:</strong> {user.email} </p>

        <div className="button-group">
          <button
            className="btn"
            onClick={() => navigate("/profile")}
          >
            Manage Profile
          </button>

          <button
            className="btn logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    ) : (
      <p className="loading">Loading...</p>
    )}
  </div>
);
}

export default Dashboard;