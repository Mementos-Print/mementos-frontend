import { DropdownMenu } from "radix-ui";
import { HamburgerMenuIcon } from "../../assets/icons/Icon";

const HamburgerDropdownMenu = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    className="inline-flex size-[35px] items-center justify-center "
                    aria-label="Customise options"
                >
                    <HamburgerMenuIcon />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_18px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                    sideOffset={5}
                >
                    <DropdownMenu.Item className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                        Profile
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="m-[5px] h-px bg-primary" />

                    <DropdownMenu.Item className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                        Login Up
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                        Sign Up
                    </DropdownMenu.Item>

                    <DropdownMenu.Arrow className="fill-white" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default HamburgerDropdownMenu;
