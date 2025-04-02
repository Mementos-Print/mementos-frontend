import { useState } from "react";
import { FilterIcon, SearchIcon } from "../../assets/icons/Icon";
import dummyData from "../../data/DummyData";
import { AdminPrintLayoutProps, Item } from "../../types/type";
import AdminImageCard from "./AdminImageCard";

const AdminPrintLayout = ({ type, setShowFiltermodal, activeFilters }: AdminPrintLayoutProps) => {
    const [selectedImagesId, setSelectedImagesId] = useState<number[]>([]);

    const handleClickFilter = () => {
        setShowFiltermodal(true);
    };

    const handleClickedImages = (item: Item) => {
        setSelectedImagesId(prev =>
            prev.includes(item.id)
                ? prev.filter(id => id !== item.id)
                : [...prev, item.id]
        );
    };

    // Filter the data based on active filters
    const filteredData = dummyData.filter(item => {
        if (activeFilters.length === 0) return true;

        return activeFilters.some(filter => {
            switch (filter) {
                case 'Name':
                    return item.name && item.name.length > 0;
                // case 'Pending':
                //     // Example: filter pending items
                //     return item.status === 'pending';
                // case 'Modified':
                //     // Example: filter modified items
                //     return item.isModified;
                default:
                    return true;
            }
        });
    });


    return (
        <div className="kanit-medium bg-[#F5F5F5] px-6 py-3">
            <div className="flex flex-row justify-between items-center">
                <div className="cursor-pointer">
                    <SearchIcon color="var(--primary)" />
                </div>
                <div className="px-3">Print {type}</div>
                <div className="cursor-pointer" onClick={handleClickFilter}>
                    <FilterIcon color="var(--primary)" />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
                {filteredData.map((photo) => (
                    <div
                        className=""
                        onClick={() => handleClickedImages(photo)}
                        key={photo.id}
                    >
                        <AdminImageCard
                            data={photo}
                            handleClickedImages={handleClickedImages}
                            selectedImagesId={selectedImagesId}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPrintLayout;