import { useState } from "react";
import { forgotPassword } from "../Services/authServices";
import { Link } from "react-router-dom";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await forgotPassword(email);

      alert(data.message);

      setEmail("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="dashboard-container">
      <div
        className="card"
        style={{
          width: "420px",
          padding: "35px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>
          Forgot Password
        </h2>

        <p
          style={{
            color: "#666",
            marginBottom: "25px",
            fontSize: "14px",
          }}
        >
          Enter your registered email address and
          we'll send you a password reset link.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="input-field"
            required
          />

          <button
            type="submit"
            className="btn"
          >
            Send Reset Link
          </button>
        </form>

        <div style={{ marginTop: "20px" }}>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#2563eb",
              fontWeight: "500",
            }}
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;