import { Link, useNavigate } from "react-router-dom";
import "../assets/navbar.css";
import React from "react";

export default function Navbar({ username }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/log-in");
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>blog-me</h2>
      </div>
      <div className="navbar-right">
        {username ? (
          <>
            <p className="nav-link">@{username}</p>
            <p onClick={handleLogout} className="nav-link">
              log out
            </p>
          </>
        ) : (
          <>
            <p className="nav-link">@guest</p>
            <Link to="/log-in" className="nav-link">
              log in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
