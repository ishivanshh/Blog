import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
// import Register from "../pages/Register";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/blog",
        element: <Blog />,
      },
      {
    path: "/dashboard",
    element: <Dashboard />,
  }      
    ],
  },
  // routing withoud layout
  {
        index: true,
        element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  
]);

export default router;
