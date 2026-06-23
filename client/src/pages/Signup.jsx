import { useState } from "react";
import { registerUser } from "../Services/authServices";
import "./Auth.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
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
      const data = await registerUser(formData);
      console.log(data);
      
      alert("User Registered Successfully");
    } catch (error) {
      console.error(error);

      alert("Registration Failed");
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h1>Signup</h1>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

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

        <button type="submit"> Register </button>
      </form>
    </div>
  </div>
  );
}

export default Signup;