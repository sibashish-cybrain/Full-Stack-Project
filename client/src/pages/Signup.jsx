import { useState } from "react";
import { registerUser } from "../Services/authServices";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
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
      await registerUser(formData);
      alert("User Registered Successfully");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Signup</h1>

        <p className="auth-subtitle">
          Create your account to get started.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

            <label>Mobile Number</label>

            <div className="phone-input-group">

              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="country-code"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+971">🇦🇪 +971</option>
              </select>

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="mobile-input"
                maxLength={10}
                pattern="[0-9]{10}"
                required
              />

            </div>

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
            Register
          </button>

        </form>

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
          Already have an account?
          <span onClick={() => navigate("/login")}>
            {" "}Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;