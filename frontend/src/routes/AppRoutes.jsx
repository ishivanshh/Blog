import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import WriteBlog from "../pages/WriteBlog";
import Profile from "../pages/Profile";
import MyBlogs from "../pages/MyBlog";
import EditBlog from "../pages/EditBlog";
import NotFound from "../pages/NotFound";
import Explore from "../pages/Explore";
import Feedback from "../pages/Feedback";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "writeblog",
        element: <WriteBlog />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "myblog",
        element: <MyBlogs />,
      },
      {
        path: "editblog/:id",
        element: <EditBlog />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      }
    ],
  },

  // =========================
  // AUTH LAYOUT
  // =========================
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  // =========================
  // NO LAYOUT
  // =========================
  {
    path: "/404",
    element: <NotFound />,
  },

  // Catch-all
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;