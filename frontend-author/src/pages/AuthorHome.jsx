import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../components/PostList";
import "../assets/author.css";
import { useState } from "react";

export default function AuthorHome() {
  const [user, setUser] = useState([null]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("failed to fetch profile:", err);
      }
    }

    fetchProfile();
  }, [token]);

  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <div className="author-home">
      <div className="author-header">
        <h1>hello, {username || "author"}!</h1>
        <button onClick={handleCreate}>+ new post</button>
      </div>
      <hr />
      <PostList showAllForAuthor={true} />
    </div>
  );
}
