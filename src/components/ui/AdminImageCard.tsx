import { CheckIcon } from "../../assets/icons/Icon";
import { AdminImageCardProps } from "../../types/type"

const AdminImageCard = ({ data, handleClickedImages, selectedImagesId }: AdminImageCardProps) => {
    const isSelected = selectedImagesId.includes(data.id);

    return (
        <div
            className="w-full h-full overflow-hidden aspect-auto group hover:cursor-pointer relative flex flex-col gap-2 items-center justify-center text-center"
        >
            <div className={`!z-10 w-5 h-5 absolute top-0 right-0 transition-opacity focus-within:opacity-100 ${isSelected ?
                'bg-secondary border-secondary border border-solid' :
                'bg-[#eeeeee77]  border-secondary border-2 border-solid '
                }`}
            >
                <input
                    type="checkbox"
                    id={data.name}
                    name={data.name}
                    value={data.name}
                    className="absolute opacity-0 w-full h-full cursor-pointer  transition-transform duration-300 "
                    onChange={() => {
                        handleClickedImages(data);
                    }}
                    checked={isSelected}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select ${data.name}`}
                />
                {isSelected && (
                    <CheckIcon color="var(--primary)" />
                )}
            </div>
            <div className="relative w-full h-full flex flex-col items-center justify-center text-center "
            >
                <img
                    src={data.image}
                    alt={data.name}
                    className="inset-0 w-full h-4/5 object-top object-cover"
                    loading="lazy"
                />

                <p className="bg-[#EEEEEE] font-medium text-center flex items-center justify-center text-xs w-full h-1/5">{data.name}</p>
            </div>
        </div>
    );
};

export default AdminImageCard;