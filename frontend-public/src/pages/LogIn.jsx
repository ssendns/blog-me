import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/auth.css";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

      if (data.role === "AUTHOR") {
        navigate("/posts");
      } else {
        navigate("/posts");
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
    </form>
  );
}
