import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
        alert("All fields required");
        return;
    }


    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      {/* 🔥 onSubmit added */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* 🔥 type submit */}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
