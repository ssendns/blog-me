import "../assets/post.css";
import React from "react";

export default function Post({ post }) {
  return (
    <li className="post-card">
      <div className="image-container">
        <img src="/image.png" alt="post" className="post-image" />
      </div>
      <div className="post-content">
        <a href={`/${post.id}`}>
          <strong>{post.title}</strong>
        </a>
        <p className="post-author">by {post.authorName || "anon"}</p>
        <p className="post-snippet">{post.content.slice(0, 500)}</p>
      </div>
    </li>
  );
}
