import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Navigation = () => {
  return (
    <div className="max-w-[525px] mx-auto h-screen bg-[#F5F5F5 overflow-y-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Navigation;
