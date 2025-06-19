import { Link, Outlet } from "react-router-dom";
import { Logo } from "../../assets/Logo";
import HamburgerDropdownMenu from "../ui/HamburgerDropdownMenu";

const Navigation = () => {
  return (
    <div>
      <div className="flex-row flex justify-between items-center w-full px-4 pt-2 pb-2 bg-[#F5F5F5]">
        <Link to={"/"}>
          <Logo />
        </Link>
        <div className="!z-[1000]">
          <HamburgerDropdownMenu />
        </div>
      </div>

      <Outlet />
    </div>
  );
};
export default Navigation;
