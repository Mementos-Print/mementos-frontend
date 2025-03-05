import { Link, Outlet } from "react-router-dom"
import { LogoDark40 } from "../assets/Logo"
import HamburgerDropdownMenu from "./ui/HamburgerDropdownMenu"

const Navigation = () => {
    return (
        <div className="bg-[#F5F5F5] ">
            <div className="flex-row flex justify-between items-center w-full px-8 pt-9 pb-2 ">
                <Link to={'/'} >
                    <div className="">
                        <LogoDark40 />
                    </div>
                </Link>
                <div className="z-[1000]">
                    <HamburgerDropdownMenu />
                </div>
            </div>

            <Outlet />
        </div>
    );
};
export default Navigation;