import { useEffect, useState } from "react";
import useStoreContext from "../../hooks/useStoreContext";
import { ImageProps } from "../../utils/ImagesService";
import AdminImageCard from "./AdminImageCard";
// import LoadingSkeleton from "./LoadingImageSkeleton";
import Loader from "./Loader";

type props = {
    isLoadingImages: boolean,
    selectedImagesId: string[],
    activeFilters: string[]
    searchValue: string
    handleClickedImages: (item: ImageProps) => void
}

const ViewImages = ({ isLoadingImages, selectedImagesId, activeFilters, searchValue, handleClickedImages }: props) => {
    const { adminImagesList, setAdminImagesList } = useStoreContext()
    const [filteredImages, setFIlteredImages] = useState(adminImagesList)

    // Filter the data based on active filters
    useEffect(() => {
        let filtered = [...adminImagesList];

        if (activeFilters.length === 0 && !searchValue) filtered = adminImagesList;
        
        // Apply search filter
        if (searchValue) {
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }
        
        // Apply active filters
        if (activeFilters.length > 0) {
            activeFilters.forEach(filter => {
                switch (filter) {
                    case 'Name':
                        filtered.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case 'Date':
                        // Implement date sorting logic here
                        // filtered.sort((a, b) => ...);
                        break;
                    default:
                        adminImagesList
                }
            });
        }
        
        setFIlteredImages(filtered);
    }, [activeFilters, adminImagesList, searchValue])

    // const handleImageError = (id: string) => {
    //     setAdminImagesList(prev => prev.filter(img => img.imageid !== id));
    //   };

    const handleImageError = (id: string) => {
        setAdminImagesList(prev => {
            const updatedList = prev.filter(img => img.imageid !== id);
            return updatedList;
        });
    };

    return (
        <div className="w-full">
            {isLoadingImages ? (
                <div className="flex justify-center items-center h-64">
                    <Loader />
                    {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 px-6">
                        {[...Array(6)].map((_, idx) => (
                            <LoadingSkeleton key={idx} />
                        ))}
                    </div> */}
                </div>
            ) : filteredImages.length === 0 ? (
                <div className="flex flex-col h-full w-full items-center j+ustify-center py-20">
                    <p>{adminImagesList.length === 0 ? 'No Images Uploaded' : 'No images match your filters'}</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 px-6">
                    {filteredImages.map((photo) => (
                        <div className="image-container" onClick={() => handleClickedImages(photo)} key={photo.imageid}>
                            <AdminImageCard
                                data={photo}
                                handleClickedImages={handleClickedImages}
                                selectedImagesId={selectedImagesId}
                                handleImageError={handleImageError}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewImages