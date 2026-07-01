import { useEffect, useState } from "react";
import { getProfile, updateProfile, changePassword } from "../Services/authServices";
import { useNavigate } from "react-router-dom";
import { uploadProfileImage } from "../Services/authServices";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./Dashboard.css";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data.user);
      setProfileData({
        name: data.user.name,
        email: data.user.email,
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
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordInput = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
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
        email: response.user.email,
      });
    } catch (error) {
      alert(error.response?.data?.message || "Profile update failed");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await changePassword(passwordData);
      alert(response.message);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Password change failed");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profileImage", file);
    try {
      const response = await uploadProfileImage(formData);
      setUser(response.user);
      alert("Profile image updated");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Upload failed"
      );
    }
  };

  console.log(user);
  console.log(user?.profileImage);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Topbar pageTitle="Profile" />

        <div className="dashboard-container">
          {user ? (
            <>
              <div className="welcome-card">
                <div className="card-body">
                  <div className="profile-image-section">

                    <img
                      src={
                        user?.profileImage
                          ? `http://localhost:5000${user.profileImage}`
                          : "/default-avatar.png"
                      }
                      alt="Profile"
                      className="profile-image"
                    />

                    <input
                      type="file"
                      id="profileUpload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      hidden
                    />

                    <label htmlFor="profileUpload" className="upload-btn">
                      Change Photo
                    </label>

                  </div>
                  <div className="card-identity">
                    <h2>{user.name}'s Profile</h2>
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

                <div className="card-actions profile-actions">
                  <button
                    className="btn-primary"
                    onClick={() => navigate("/dashboard")}
                  >
                    ← Back to Dashboard
                  </button>

                  {user.role === "admin" && (
                    <button
                      className="btn-secondary"
                      onClick={() => navigate("/admin")}
                    >
                      Admin Dashboard
                    </button>
                  )}
                </div>
              </div>

              <div className="forms-container">
                <div className="card profile-form-card">
                  <h2>Update Profile</h2>

                  <form onSubmit={handleUpdateProfile} className="form">
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

                    <button type="submit" className="btn">
                      Update Profile
                    </button>
                  </form>
                </div>

                <div className="card profile-form-card">
                  <h2>Change Password</h2>

                  <form onSubmit={handleChangePassword} className="form">
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

                    <button type="submit" className="btn">
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <p className="loading">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;