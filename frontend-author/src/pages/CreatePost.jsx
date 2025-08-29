import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/createPost.css";
import React from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("you must be logged in");
      return;
    }

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(uploadData.message || "image upload failed");
        }

        imageUrl = uploadData.url;
      }

      const postData = {
        title,
        content,
        published,
      };

      if (imageUrl) {
        postData.imageUrl = imageUrl;
      }

      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "failed to create post");
      }

      navigate(-1);

      setTitle("");
      setContent("");
      setPublished(true);
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

        <label>cover image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <label>
          <input
            className="checkbox"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          publish immediately
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
