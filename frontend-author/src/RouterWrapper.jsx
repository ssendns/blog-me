import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Posts from "./pages/Posts";

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

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <AppWrapper />,
    children: [
      {
        path: "/posts",
        element: <Posts />,
      },
    ],
  },
]);

function RouterWrapper() {
  return <RouterProvider router={router} />;
}

export default RouterWrapper;
