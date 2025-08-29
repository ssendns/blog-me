import "../assets/postList.css";
import React from "react";

export default function Post({ post }) {
  const currentUser = localStorage.getItem("username");

  return (
    <li className="post-card">
      <div className="image-container">
        <img src="/image.png" alt="post" className="post-image" />
      </div>
      <div className="post-content">
        <div className="post-content-text">
          <a href={`/posts/${post.id}`}>
            <strong>
              {post.title} {!post.published && <span className="lock">🔒</span>}
            </strong>
          </a>
          <p className="post-author">by {post.authorName || "anon"}</p>
          <p className="post-snippet">{post.content.slice(0, 500)}</p>
        </div>
        <div className="post-content-link">
          {post.authorName === currentUser && (
            <a className="edit-link" href={`/edit/${post.id}`}>
              edit
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
