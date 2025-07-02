import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Navigation = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Navigation;
