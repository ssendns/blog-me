import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Feed from "./pages/Feed";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Navbar from "./components/Navbar";

function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get("username");
    const token = params.get("token");
    const role = params.get("role");

    if (username && token && role) {
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const username = localStorage.getItem("username");

  return (
    <>
      <Navbar username={username} />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <AppWrapper />,
    children: [
      {
        path: "/posts",
        element: <Feed />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      { path: "/posts/:id", element: <PostPage /> },
      {
        path: "/create",
        element: <CreatePost />,
      },
      { path: "/edit/:id", element: <EditPost /> },
    ],
  },
]);

function RouterWrapper() {
  return <RouterProvider router={router} />;
}

export default RouterWrapper;
