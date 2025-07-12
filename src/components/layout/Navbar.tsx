import { Link } from "react-router-dom";
import { HamburgerMenuIcon, NotifyIcon } from "../../assets/icons/Icon";
import { Logo } from "../../assets/Logo";
import { useAppState } from "../../hooks/useAppState";
import { useSetSelected } from "../../hooks/useSetSelected";
import { DashboardHeader } from "../ui/Dashboard";

const Navbar = () => {
  const { accessToken } = useAppState();
  const setSelected = useSetSelected();
  const handleSidebar = () => {
    setSelected("activeNav", true);
  };
  return (
    <DashboardHeader className="flex justify-between">
      <div className="flex gap-2 items-center">
        {accessToken && <HamburgerMenuIcon onClick={handleSidebar} />}
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {accessToken && (
        <div className="flex items-center gap-4">
          <NotifyIcon />
          <img
            src="/image_8.jpg"
            alt="profile"
            className="w-6 h-6 rounded-full"
          />
        </div>
      )}
    </DashboardHeader>
  );
};

export default Navbar;
