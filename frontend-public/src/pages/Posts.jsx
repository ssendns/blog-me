import { useEffect, useState } from "react";
import PostList from "../components/PostList";

export default function Posts() {
  const [posts, setPosts] = useState([]);

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
      <PostList posts={posts} />
    </main>
  );
}
