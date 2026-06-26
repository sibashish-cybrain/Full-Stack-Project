import { useState } from "react";
import { loginUser } from "../Services/authServices";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      alert(response.message);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card" >
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit"> Login </button>

        <p style={{ marginTop: "10px" }}>
          <span
            style={{
              color: "#0d6efd",
              cursor: "pointer",
              fontWeight: "500"
            }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </p>

        <hr style={{ margin: "8px 0", border: "1px solid #eee" }} />

        <p className="signup-text">
          Don't have an account?{" "}
          <span
            style={{
              color: "#0d6efd",
              cursor: "pointer",
              fontWeight: "500"
            }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
              </form>
            </div>
          </div>
        );
        }

export default Login;