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
        {username ? (
          <p className="nav-link">@{username}</p>
        ) : (
          <>
            <Link to="/log-in" className="nav-link">
              log in
            </Link>
            <Link to="/sign-up" className="nav-link">
              sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
