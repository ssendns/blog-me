import { useState } from "react";
import "../assets/auth.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [authorCode, setAuthorCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { username, password, isAuthor, authorCode };

    try {
      const res = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("failed to sign up");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>sign up</h1>
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
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isAuthor}
          onChange={(e) => setIsAuthor(e.target.checked)}
        />
        i want to be an author
      </label>

      {isAuthor && (
        <input
          type="text"
          placeholder="author secret code"
          value={authorCode}
          onChange={(e) => setAuthorCode(e.target.value)}
          required
        />
      )}

      <button type="submit">sign up</button>
    </form>
  );
}
