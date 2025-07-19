import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import React from "react";
import Navbar from "../components/Navbar";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:3000/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("failed to fetch posts:", err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <main>
      <Navbar username={username} />
      <PostList posts={posts} />
    </main>
  );
}
