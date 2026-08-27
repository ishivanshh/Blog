import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = null; // replace this with your actual auth state

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;