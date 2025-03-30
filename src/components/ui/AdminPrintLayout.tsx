import { useState } from "react";
import { FilterIcon, SearchIcon } from "../../assets/icons/Icon";
import dummyData from "../../data/DummyData";
import { Item } from "../../types/type";
import ImageCard from "./ImageCard";

const AdminPrintLayout = ({ type }: { type: string }) => {
    // const { store, setStore } = useStoreContext();
    const [selectedImagesId, setSelectedImagesId] = useState<number[]>([])

    const AddSelectedImages = (item: Item) => {
        setSelectedImagesId(prevSelection => {
            const updatedSelection = [...prevSelection];
            if (!Object.values(selectedImagesId).includes(item.id)) {
                updatedSelection.push(item.id);
            }
            // console.log(selectedImagesId);

            return updatedSelection;
        });
    }

    const RemoveSelectedImages = (item: Item) => {
        setSelectedImagesId(selectedImagesId => selectedImagesId.filter((img) => img !== item.id));
    }

    const handleClickedImages = (Item: Item) => {
        if (!Object.values(selectedImagesId).includes(Item.id)) {
            AddSelectedImages(Item)
        } else {
            RemoveSelectedImages(Item)
        }
    }
    return (
        <div className="kanit-medium bg-[#F5F5F5] px-6 py-3">
            <div className="flex flex-row justify-between items-center">
                <SearchIcon color="var(--primary)" />
                <div className="px-3">Print {type}</div>
                <FilterIcon color="var(--primary)" />
            </div>
            <div className="flex flex-wrap gap-5">
                {dummyData.map((data, index) => (
                    <div key={index}>
                        <ImageCard data={data} handleClickedImages={handleClickedImages} selectedImagesId={selectedImagesId}/>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default AdminPrintLayout