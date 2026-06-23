import { useEffect, useState } from "react";
import { getProfile, updateProfile, changePassword} from "../Services/authServices";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data.user);
      setProfileData({
        name: data.user.name,
        email: data.user.email
      });
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };
    
  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordInput = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(profileData);
      alert(response.message);
      setUser(response.user);

      setProfileData({
        name: response.user.name,
        email: response.user.email
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Profile update failed"
      );
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await changePassword(passwordData);
      alert(response.message);
      setPasswordData({
        currentPassword: "",
        newPassword: ""
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Password change failed"
      );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account settings</p>
      </div>
      {user ? (
        <>
          <div className="card profile-card">
            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h2>{user.name}'s Profile</h2>

            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <div className="button-group">
              <button
                className="nav-btn dashboard-btn"
                onClick={() => navigate("/dashboard")}
              >
                ← Dashboard
              </button>

              {user.role === "admin" && (
                <button
                  className="nav-btn admin-btn"
                  onClick={() => navigate("/admin")}
                >
                  🛡 Admin Dashboard
                </button>
              )}
            </div>
          </div>

          <div className="forms-container">
            <div className="card">
              <h2>Update Profile</h2>

              <form onSubmit={handleUpdateProfile} className="form" >
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  placeholder="Name"
                  className="input-field"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  placeholder="Email"
                  className="input-field"
                  required
                />

                <button type="submit" className="btn" > Update Profile </button>
              </form>
            </div>

            <div className="card">
              <h2>Change Password</h2>

              <form
                onSubmit={handleChangePassword}
                className="form"
              >
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordInput}
                  placeholder="Current Password"
                  className="input-field"
                  required
                />

                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInput}
                  placeholder="New Password"
                  className="input-field"
                  required
                  minLength={8}
                />

                <button type="submit" className="btn" > Change Password </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}

export default Profile;