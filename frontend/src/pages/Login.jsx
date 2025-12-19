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
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);

        // ✅ REAL redirect
        navigate("/explain");
      })
      .catch(() => {
        alert("Login failed");
      });
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          value={password}
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {/* This is where <Link> belongs */}
      <p>
        New user? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}
