import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/auth.css";
import React from "react";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");
    const token = params.get("token");
    const role = params.get("role");

    if (username && token && role) {
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("failed to log in");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);
      console.log(data);

      if (data.role === "AUTHOR") {
        const query = new URLSearchParams({
          username: data.username,
          token: data.token,
          role: data.role,
        }).toString();

        window.location.href = `http://localhost:5174/posts?${query}`;
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("login failed:", err);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>log in</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">log in</button>
      <p className="auth-link">
        do not have an account? <Link to="/sign-up">sign up</Link>
      </p>
    </form>
  );
}
