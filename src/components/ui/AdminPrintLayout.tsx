import { useState } from "react";
import { Close, FilterIcon, SearchIcon } from "../../assets/icons/Icon";
import dummyData from "../../data/DummyData";
import { AdminPrintLayoutProps, Item } from "../../types/type";
import AdminImageCard from "./AdminImageCard";

const AdminPrintLayout = ({ type, setShowFiltermodal, activeFilters }: AdminPrintLayoutProps) => {
    const [selectedImagesId, setSelectedImagesId] = useState<number[]>([]);
    const [search, setSearch] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

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

    const handleClickSearch = () => {
        setSearch(prev => !prev);
    }

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);

        // const value = e.target.value.toLowerCase();
        // const filteredData = dummyData.filter(item =>
        //     item.name.toLowerCase().includes(value)
        // );
        // setFilteredData(filteredData);
    }

    return (
        <div className="kanit-medium bg-[#F5F5F5]  py-3">
            <div className="flex flex-row justify-between items-center px-6">
                <div className="cursor-pointer" onClick={handleClickSearch}>
                    <SearchIcon color="var(--primary)" />
                </div>
                <div className="px-3">Print {type}</div>
                <div className="cursor-pointer" onClick={handleClickFilter}>
                    <FilterIcon color="var(--primary)" />
                </div>
            </div>
            {search && (<div className="flex flex-row justify-between items-center my-2 bg-[#D9D9D9] border border-[#D9D9D9] px-6 py-1 mt-3 gap-3 fo">
                <input
                    type="text"
                    className=" w-full bg-[#D9D9D9] text-sm font-normal  focus:border-none focus:outline-none"
                    placeholder="Search Images"
                    value={searchValue}
                    onChange={(e) => handleChangeSearch(e)}
                />
                <div onClick={() => setSearchValue("")} className="cursor-pointer">
                    <Close />
                </div>
            </div>)}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 px-6">
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