import { Link } from "react-router-dom";
import { Logo } from "../../assets/Logo";
import HamburgerDropdownMenu from "../ui/HamburgerDropdownMenu";

type NavigationProps = {
  className?: string;
}
const Navbar = ({className}: NavigationProps) => {
  return (
    <div className={`flex-row flex justify-between items-center w-full px-4 pt-2 pb-2 ${className}`}>
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
