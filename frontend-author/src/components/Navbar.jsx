import { Link } from "react-router-dom";
import "../assets/navbar.css";
import React from "react";

export default function Navbar({ username }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = `http://localhost:5173/log-in`;
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>blog-me</h2>
        <Link to="/posts" className="nav-link">
          all posts
        </Link>
      </div>
      <div className="navbar-right">
        {username ? (
          <>
            <Link to="/profile" className="nav-link">
              @{username}
            </Link>
            <p onClick={handleLogout} className="nav-link">
              log out
            </p>
          </>
        ) : (
          <Link to="/profile" className="nav-link">
            @my profile
          </Link>
        )}
      </div>
    </nav>
  );
}
