import { ImageIcon } from "../../assets/icons/Icon"
import { DropdownWithImageProps } from "../../types/type";

export const DropdownItemImage = ({value}: {value: string}) => {
    return (
        <div className="inline-flex flex-row justify-between items-center p-2 bg-[#FAFAFA] rounded-lg w-[272px] hover:bg-dropdown">
            <p>{value}</p>
            <div>
                <ImageIcon />
            </div>
        </div>
    )
}

const DropdownWithImage: React.FC<DropdownWithImageProps> = ({
    options,
}) => {

    const handleSelect = (value: string) => {
        console.log(value);
    };

    return (
        <div className="relative">
            <ul className="w-fit bg-[#FAFAFA] p-4 shadow-[0_2px_15px] shadow-shadow shadow-opacity-50 rounded-lg">
                {options.map((option) => (
                    <li
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                    >
                        <DropdownItemImage value={option.value}/>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DropdownWithImage;


// usage 
{/*
const Imageoptions = [
    {
        label: "item 1",
        value: "item1",
        icon: "/icons/item1.png", // Replace with your image path or URL
    },
    {
        label: "item 2",
        value: "item2",
        icon: "/icons/item2.png",
    },
    {
        label: "item 3",
        value: "item3",
        icon: "/icons/item3.png",
    },
];
<DropdownWithImage
    options={Imageoptions}
    defaultValue="item1"
    onChange={(value: string) => {console.log("Selected value:", value);}}
/>    
*/}