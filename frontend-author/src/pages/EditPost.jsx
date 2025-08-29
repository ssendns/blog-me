import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/createPost.css";
import React from "react";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`http://localhost:3000/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        setTitle(data.title || "");
        setContent(data.content || "");
        setPublished(data.published || false);
        setImageUrl(data.imageUrl || "");
      } catch (err) {
        console.error("failed to fetch post:", err);
      }
    }

    fetchPost();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalImageUrl = imageUrl;
      if (newImage) {
        const formData = new FormData();
        formData.append("file", newImage);

        const uploadRes = await fetch("http://localhost:3000/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(uploadData.message || "image upload failed");
        }

        finalImageUrl = uploadData.url;
      }

      const postData = {
        title,
        content,
        published,
      };

      if (imageUrl) {
        postData.imageUrl = finalImageUrl;
      }

      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        throw new Error("failed to update post");
      }

      navigate(-1);
    } catch (err) {
      console.error("failed to update post:", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("failed to delete post");
      }

      navigate(-1);
    } catch (err) {
      console.error("failed to delete post:", err);
    }
  };

  return (
    <div className="create-post">
      <h2>edit post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <label className="checkbox-group">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          publish post
        </label>

        <label>cover image:</label>
        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="cover" width="200" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewImage(e.target.files[0])}
        />

        <button type="submit">update post</button>
        <button type="button" className="delete-button" onClick={handleDelete}>
          delete post
        </button>
      </form>
    </div>
  );
}
