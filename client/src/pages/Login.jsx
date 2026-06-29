import { useState } from "react";
import { loginUser } from "../Services/authServices";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      alert(response.message);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Login</h1>

        <p className="auth-subtitle">
          Welcome back! Please sign in to your account.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <p
          className="forgot-password"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        <div className="divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="google-btn"
          onClick={() =>
            (window.location.href =
              "http://localhost:5000/api/auth/google")
          }
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />
          <span>Continue with Google</span>
        </button>

        <p className="signup-text">
          Don't have an account?
          <span onClick={() => navigate("/signup")}>
            {" "}Sign up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;