import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../Services/authServices";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await resetPassword(
        token,
        password
      );

      alert(data.message);

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div
        className="card"
        style={{
          width: "420px",
          padding: "35px",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "10px" }}> Reset Password </h2>

        <p
          style={{
            color: "#666",
            marginBottom: "25px"
          }}
        >
          Enter a new password for your account
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="input-field"
            required
            minLength={8}
          />

          <button
            type="submit"
            className="btn"
            disabled={loading}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>

        <Link
          to="/login"
          style={{
            display: "inline-block",
            marginTop: "20px",
            textDecoration: "none",
            color: "#2563eb",
            fontWeight: "500"
          }}
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;