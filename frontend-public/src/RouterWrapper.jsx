import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./pages/Posts";

function RouterWrapper() {
  const router = createBrowserRouter([
    {
      path: "/posts",
      element: <Posts />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterWrapper;
