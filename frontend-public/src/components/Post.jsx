import "../assets/postList.css";
import React from "react";

export default function Post({ post }) {
  const currentUser = localStorage.getItem("username");

  const hasImage = !!post.imageUrl?.trim();
  const maxLength = hasImage ? 100 : 500;
  const preview =
    post.content.length > maxLength
      ? post.content.slice(0, maxLength) + "..."
      : post.content;

  return (
    <li className="post-card">
      {hasImage && (
        <div className="image-container">
          <img src={post.imageUrl} alt="post" className="post-image" />
        </div>
      )}
      <div className="post-content">
        <div className="post-content-text">
          <a href={`/posts/${post.id}`}>
            <strong>
              {post.title} {!post.published && <span className="lock">🔒</span>}
            </strong>
          </a>
          <p className="post-author">by {post.authorName || "anon"}</p>
          <p className="post-snippet">{preview}</p>
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
