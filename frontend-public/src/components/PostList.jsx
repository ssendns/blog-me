import Post from "./Post";
import "../assets/postList.css";
import React from "react";

export default function PostList({ posts = [] }) {
  const currentUser = localStorage.getItem("username");

  return (
    <div className="posts-container">
      <h1>all posts</h1>
      <div className="posts-list">
        {posts.length === 0 ? (
          <p>no posts yet</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <Post key={post.id} post={post} currentUser={currentUser} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
