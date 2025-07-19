import "../assets/post.css";
import React from "react";

export default function Post({ post, currentUser }) {
  return (
    <li className="post-card">
      <a href={`/posts/${post.id}`}>
        <strong>{post.title}</strong>
      </a>
      <p className="post-author">by {post.authorName || "anon"}</p>
      <p className="post-snippet">{post.content.slice(0, 150)}...</p>
      {post.authorName === currentUser && (
        <a className="edit-link" href={`/edit/${post.id}`}>
          edit
        </a>
      )}
    </li>
  );
}
