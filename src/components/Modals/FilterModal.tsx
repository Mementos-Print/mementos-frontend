import { useEffect, useRef, useState } from "react";
import { FilterProps } from "../../types/type";

const filterList = ['Name', 'Pending', 'Modified'];

const FilterModal = ({ showFiltermodal, onClose, onFilterChange }: FilterProps) => {
    const [checked, setChecked] = useState<number[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose(); // Close the modal
            }
        };

        if (showFiltermodal) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFiltermodal, onClose]);

    const handleChecked = (checkid: number) => {
        setChecked((prev) => {
            const updatedChecked = [...prev];
            if (!updatedChecked.includes(checkid)) {
                updatedChecked.push(checkid);
            } else {
                const index = updatedChecked.indexOf(checkid);
                updatedChecked.splice(index, 1);
            }

            const selectedFilters = updatedChecked.map(index => filterList[index]);
            onFilterChange(selectedFilters);
            console.log(updatedChecked, 'checked');

            return updatedChecked;
        });
    };

    if (!showFiltermodal) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center shadow-xl z-50">
            <div
                ref={modalRef}
                className="relative bg-gray_2 py-7 rounded-lg shadow-[0_15px_20px] shadow-shadow shadow-opacity-80 flex flex-col items-center gap-5 w-[70%] h-fit m-auto"
            >
                <div className="flex flex-col justify-center text-left border-b border-black/20 border-solid w-full pb-4">
                    <h1 className="kanit-medium text-lg px-7">Filter By</h1>
                </div>

                <div className="flex flex-col gap-4 w-full px-7">
                    {filterList.map((filter, index) => (
                        <div key={index} className="flex flex-row gap-2 items-center group">
                            <div className={` w-4 h-4 rounded-full transition-opacity focus-within:opacity-100 ${checked.includes(index) ?
                                'bg-secondary border-primary border-2 border-solid' :
                                'bg-[#eeeeee77]  border-primary border border-solid '
                                }`}>
                                <input
                                    type="checkbox"
                                    id={filter}
                                    name={filter}
                                    value={filter}
                                    className="absolute opacity-0 w-full h-full cursor-pointer "
                                    onChange={() => handleChecked(index)}
                                    checked={checked.includes(index)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                            <label htmlFor={filter} className="text-sm kanit-light">
                                {filter}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterModal;