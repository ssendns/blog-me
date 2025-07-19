import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./pages/Feed";
import PostPage from "./pages/PostPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import React from "react";

function RouterWrapper() {
  const router = createBrowserRouter([
    { path: "/posts", element: <Feed /> },
    { path: "/posts/:id", element: <PostPage /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/log-in", element: <LogIn /> },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterWrapper;
