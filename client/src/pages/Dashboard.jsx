import { useEffect, useState } from "react";
import { getProfile } from "../Services/authServices";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../Components/Topbar";

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

  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Topbar pageTitle="Dashboard" />

        <div className="dashboard-container">
          {user ? (
            <div className="welcome-card">

              <div className="card-body">
                <div className="avatar-lg">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="dashboard-avatar"
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="card-identity">
                  <h2>{user.name}</h2>
                  <div className="status-row">
                    <span className="status-dot" /> Active today
                  </div>
                </div>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <div className="label">Email</div>
                  <div className="value">{user.email}</div>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="btn-primary"
                  onClick={() => navigate("/profile")}
                >
                  Manage Profile
                </button>
              </div>
            </div>
          ) : (
            <p className="loading">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;