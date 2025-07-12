import { Link, useNavigate } from "react-router-dom";
import { SidebarProps } from "../../types";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

import {
  Dashboard,
  PhotoBooth,
  Logout,
  PhotoLibrary,
} from "../../assets/icons/Icon";
import { useSetSelected } from "../../hooks/useSetSelected";
import { useAppState } from "../../hooks/useAppState";
import { logout } from "../../pages/auth/auth";

const SidebarItems = [
  { name: "Dashboard", icon: <Dashboard />, to: "/dashboard" },
  { name: "Photo library", icon: <PhotoLibrary />, to: "/dashboard" },
  { name: "Photo booth", icon: <PhotoBooth />, to: "/dashboard" },
];
export const Sidebar = () => {
  const setSelected = useSetSelected();
  const { activeNav } = useAppState();
  const handleNav = () => {
    setSelected("activeNav", false);
  };
  return (
    <div
      className={`w-11/12 h-screen bg-[#F5F5F5] fixed  transition-transform duration-300 ease-in-out  z-[999] py-16 ${
        activeNav ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="px-2 flex flex-col gap-3">
        {SidebarItems.map((item, idx) => {
          return (
            <NavItems
              key={idx}
              name={item.name}
              icon={item.icon}
              to={item.to}
              onClick={handleNav}
            />
          );
        })}
      </div>
      <Profile />
      <X size={30} className="absolute top-5 right-5" onClick={handleNav} />
    </div>
  );
};

export const NavItems = ({ name, icon, to, onClick }: SidebarProps) => {
  return (
    <Link to={to}>
      <div
        className="flex justify-between items-center p-3 rounded-md cursor-pointer"
        onClick={onClick}
      >
        <div className="flex gap-2">
          {icon}
          <p className="text-xl">{name}</p>
        </div>
      </div>
    </Link>
  );
};

export const Profile = () => {
  const setSelected = useSetSelected();
  const { accessToken } = useAppState();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    if (!accessToken) return;
    logout(accessToken)
      .then(() => {
        setSelected("accessToken", "");
        // setSelected("authLoading", false);
        setSelected("activeNav", false);
        navigate("/");
      })
      .catch((err) => {
        toast(err?.response?.data?.error);
      });
  };
  return (
    <div className="absolute bottom-10 pl-6">
      <div className="flex items-center gap-2 mb-3">
        <img
          src="/image_4.jpg"
          className="w-10 h-10 rounded-full"
          alt="user-profile"
        />
        <div>
          <p className="text-xl">Chris N.</p>
          <p className="text-xs font-light text-[#9E9E9E]">
            Joined 8th June, 2025
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2" onClick={handleSignOut}>
        <Logout />
        <p className="text-xl">Log out</p>
      </div>
      <ToastContainer />
    </div>
  );
};
