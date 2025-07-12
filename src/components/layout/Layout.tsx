import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";

const Navigation = () => {
  return (
    <div className="">
      <Sidebar />
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Navigation;
