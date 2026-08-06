import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Outlet is the placeholder where the current page is rendered. */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;