import { useEffect, useState } from "react";
import "../assets/postList.css";

export default function PostList({ showAllForAuthor = false }) {
  const [posts, setPosts] = useState([]);
  const currentUser = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const endpoint = showAllForAuthor
      ? "http://localhost:3000/posts/my-posts"
      : "http://localhost:3000/posts";

    fetch(endpoint, {
      headers: showAllForAuthor
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Expected array, got:", data);
          setPosts([]);
        }
      })
      .catch((err) => console.error("failed to fetch posts:", err));
  }, [showAllForAuthor, token]);

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
                {post.authorName === currentUser && (
                  <a className="edit-link" href={`/edit/${post.id}`}>
                    edit
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
