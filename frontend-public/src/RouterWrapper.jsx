import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function RouterWrapper() {
  const router = createBrowserRouter([
    {
      path: "/posts",
      element: <Posts />,
    },
    { path: "/posts/:id", element: <Post /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/log-in", element: <LogIn /> },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterWrapper;
