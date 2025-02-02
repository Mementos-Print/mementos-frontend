import { LogoDark40 } from "../assets/Logo"
import HamburgerDropdownMenu from "./ui/HamburgerDropdownMenu"

const Navbar = () => {
    return (
        <div className="flex-row flex justify-between items-center w-full px-8 pt-9 pb-2">
            <div>
            <LogoDark40 />
            </div>
            <div>
                <HamburgerDropdownMenu />
            </div>
        </div>
    )
}

export default Navbar