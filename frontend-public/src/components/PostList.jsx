import { useEffect, useState } from "react";
import "../assets/postList.css";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  return (
    <div className="posts-container">
      <h1>all posts</h1>
      <div className="posts-list">
        {posts.length === 0 ? (
          <p>no posts yet</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="post-card">
                <a href={`/posts/${post.id}`}>
                  <strong>{post.title}</strong>
                </a>
                <p className="post-author">by {post.authorName || "anon"}</p>
                <p className="post-snippet">{post.content.slice(0, 150)}...</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
