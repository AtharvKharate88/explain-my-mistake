import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
        alert("All fields required");
        return;
    }


    axios
      .post(`${import.meta.env.VITE_API_URL}/api/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("email", email);


        // ✅ REAL redirect
        navigate("/explain");
      })
      .catch(() => {
        alert("Login failed");
      });
  };

  return (
    <div className="page-container fade-in">
      <h1>Welcome Back</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign In</button>
      </form>

      <p className="text-center">
        New user? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}
