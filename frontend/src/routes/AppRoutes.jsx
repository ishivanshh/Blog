import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
// import Blog from "../pages/Blog";
import Login from "../pages/Login";
import WriteBlog from "../pages/WriteBlog";
import Dashboard from "../pages/Dashboard";
// import Register from "../pages/Register";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import MyBlogs from "../pages/MyBlog";
import EditBlog from "../pages/EditBlog";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
    path: "/dashboard",
    element: <Dashboard />,
  }      
    ],
  },
  // routing withoud layout
  {
        index: true,
        path : "/home",
        element: <Home />,
  },
  {
        path: "/writeblog",
        element: <WriteBlog />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path : "/profile",
    element : <Profile/>
  },
  {
    path : "*",
    element : <NotFound/>
  },
  {
    path : "/myblog",
    element : <MyBlogs/>
  },
  {
    path : "/editblog",
    element : <EditBlog/>
  }
  
]);

export default router;
