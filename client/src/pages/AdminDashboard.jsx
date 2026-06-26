import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../Services/authServices";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./Dashboard.css";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.users);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Remove ${name} from the system? This can't be undone.`
    );
    if (!confirmDelete) return;
    try {
      const response = await deleteUser(id);
      alert(response.message);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Topbar pageTitle="Admin Dashboard" />

        <div className="dashboard-container">
          <div className="users-header">
            <div>
              <h1>Users</h1>
              <p>Manage all registered users</p>
            </div>
            <div className="users-count">
              {users.length} {users.length === 1 ? "user" : "users"}
            </div>
          </div>

          <div className="users-card">
            {users.length === 0 ? (
              <div className="users-empty">No users found.</div>
            ) : (
              <div className="users-list">
                {users.map((user) => (
                  <div key={user._id} className="user-row">
                    <div className="user-identity">
                      <div className="user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-text">
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>

                    <span
                      className={`role-badge ${
                        user.role === "admin" ? "role-admin" : "role-user"
                      }`}
                    >
                      {user.role}
                    </span>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id, user.name)}
                      aria-label={`Delete ${user.name}`}
                      title="Delete user"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;