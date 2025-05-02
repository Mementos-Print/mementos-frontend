import { DropdownMenu } from "radix-ui";
import { HamburgerMenuIcon } from "../../assets/icons/Icon";
import { Link, useNavigate } from "react-router-dom";
import { useSetSelected } from "../../hooks/useSetSelected";
import { useState } from "react";
import useStoreContext from "../../hooks/useStoreContext";
import { logoutUser } from '../../api/userAuth'
import { logoutStaff } from "../../api/adminAuth";

const HamburgerDropdownMenu = () => {
  const { setStore, store } = useStoreContext();
  const setSelected = useSetSelected();
  const navigate = useNavigate();
  const [_loading, setLoading] = useState(Boolean);

  const hanldeSignOut = async (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Call the imported login function
      let authToken
      if (store.user.role = 'admin') {
        authToken = await logoutStaff();
      } else {
        authToken = await logoutUser();
      }
      // remove the token and update state
      setSelected("isAuthenticated", false);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("authToken");
      localStorage.removeItem("selectedToPrint");
      localStorage.removeItem("store");

      setSelected("accessToken", authToken);

      // Reset store state
      setStore({
        user: {},
        border: '',
        selectedToPrint: [],
        importedImages: [],
        // uploadedImages: []
      });

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error('Logut failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex size-[35px] items-center justify-center relative"
          aria-label="Customise options"
        >
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="!z-[1000] min-w-[160px] mr-3 bg-[#D9D9D9] shadow-[0px_10px_18px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Separator className="my-[5px] pt-8 h-px bg-[#D9D9D9] border-b-2 border-primary border-solid" />

          <DropdownMenu.Item className="group relative p-[5px] flex h-[25px] select-none items-center justify-end rounded-[3px] pr-[25px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 hover:bg-secondary">
            Mementos V
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-[5px] h-px bg-[#000000]/20" />

          <DropdownMenu.Item className="group relative p-[5px] flex h-[25px] select-none items-center justify-end rounded-[3px] pr-[25px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 hover:bg-secondary cursor-pointer">
            <Link to={"/"}>Mementos S</Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-[5px] h-px bg-[#000000]/20" />
          <DropdownMenu.Item className="group relative p-[5px] flex h-[25px] select-none items-center justify-end rounded-[3px] pr-[25px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 hover:bg-secondary cursor-pointer">
            <Link to={'/admin/login'} >
              Login as Admin
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-[5px] mt-14 border-b-2 border-primary border-solid" />
          <DropdownMenu.Item onClick={hanldeSignOut} className="group relative flex h-[25px] select-none items-center justify-end rounded-[3px] pr-[25px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 hover:bg-secondary cursor-pointer">
            <p >Sign Out</p>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default HamburgerDropdownMenu;
