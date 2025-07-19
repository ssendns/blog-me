import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./pages/Posts";
import Post from "./pages/Post";

function RouterWrapper() {
  const router = createBrowserRouter([
    {
      path: "/posts",
      element: <Posts />,
    },
    { path: "/posts/:id", element: <Post /> },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterWrapper;
