import { Link } from "react-router-dom";
import "../assets/navbar.css";
import React from "react";

export default function Navbar({ username }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>blog-me</h2>
        <Link to="/posts" className="nav-link">
          all posts
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/author" className="nav-link">
          {username ? `@${username}` : "my profile"}
        </Link>
      </div>
    </nav>
  );
}
