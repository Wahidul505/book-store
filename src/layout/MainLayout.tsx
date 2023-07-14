import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
