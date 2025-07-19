import { useState } from "react";
import "../assets/createPost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("you must be logged in");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          published: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "failed to create post");
      }

      setTitle("");
      setContent("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit} className="create-post-form">
        <h2>create new post</h2>

        <label>title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
