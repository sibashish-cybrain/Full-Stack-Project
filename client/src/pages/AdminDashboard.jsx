import { useEffect, useState } from "react";
import { getAllUsers, deleteUser} from "../Services/authServices";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.users);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to fetch users"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
    try {
      const response = await deleteUser(id);
      alert(response.message);
      setUsers(
        users.filter((user) => user._id !== id)
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="card">
        <h2>Users List</h2>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px"
              }}
            >
              <p> <strong>Name:</strong> {user.name} </p>
              <p> <strong>Email:</strong> {user.email} </p>
              <p> <strong>Role:</strong> {user.role} </p>

              <button
                onClick={() =>
                  handleDelete(user._id)
                }
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Delete User
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;