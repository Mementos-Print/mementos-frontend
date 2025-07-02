import { Link , useMatch} from "react-router-dom";
import { Logo } from "../../assets/Logo";
import HamburgerDropdownMenu from "../ui/HamburgerDropdownMenu";


const Navbar = () => {
  const isonHome = useMatch("/")
  const isOnDashboard = useMatch("/user/dashboard")
  return (
    <div className={`flex-row flex justify-between items-center w-full px-4 pt-2 pb-2 ${!isOnDashboard && !isonHome ? "bg-[#F5F5F5]": ""}`}>
      <Link to={"/"}>
        <Logo />
      </Link>
      <div className="!z-[1000]">
        <HamburgerDropdownMenu />
      </div>
    </div>
  );
};

export default Navbar;
