import { useEffect, useState } from "react";
import { Close, FilterIcon, SearchIcon } from "../../assets/icons/Icon";
import { AdminPrintLayoutProps } from "../../types/type";
import useStoreContext from "../../hooks/useStoreContext";
import { fetchImages, ImageProps } from "../../utils/ImagesService";
import { toast } from "react-toastify";
import ViewImages from "./ViewImages";
import printJS from 'print-js';
import { Button } from "./Button";

const AdminPrintLayout = ({ type, setShowFiltermodal, activeFilters }: AdminPrintLayoutProps) => {
    const [selectedImagesId, setSelectedImagesId] = useState<string[]>([]);
    const [search, setSearch] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const { adminImagesList, store, setAdminImagesList } = useStoreContext()
    const [isLoadingImages, setIsLoadingImages] = useState(false)

    const handleClickFilter = () => {
        setShowFiltermodal(true);
    };

    const handleClickedImages = (item: ImageProps) => {
        setSelectedImagesId(prev =>
            prev.includes(item.imageid)
                ? prev.filter(id => id !== item.imageid)
                : [...prev, item.imageid]
        );
    };

    useEffect(() => {
        const fetchImagesList = async () => {
            if (store.user.role === 'admin') {
                setIsLoadingImages(true);
                try {
                    const images = await fetchImages();
                    setAdminImagesList(images);
                } catch (error) {
                    toast.error('Error fetching images');
                } finally {
                    setIsLoadingImages(false);
                }
            }
        };

        fetchImagesList();
    }, [store.user.role, setAdminImagesList]);



    const handleClickSearch = () => {
        setSearch(prev => !prev);
    }

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const handlePrint = () => {
        // Filter and map only selected images
        const printableImages = adminImagesList
            .filter(image => selectedImagesId.includes(image.imageid))
            .map(image => image.imageurl)

        if (printableImages.length === 0) {
            alert('Please select at least one image to print');
            return;
        }

        printJS({
            printable: printableImages,
            type: 'image',
            header: 'Selected Images',
            imageStyle: 'width:50%; margin-bottom:20px;',
            onError: (error) => console.error('Print error:', error)
        });
    };

    return (
        <div className="kanit-medium min-h-[80vh] h-screen bg-[#F5F5F5]  py-3">
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
                    placeholder="Search Images..."
                    value={searchValue}
                    onChange={(e) => handleChangeSearch(e)}
                />
                <div onClick={() => setSearchValue("")} className="cursor-pointer">
                    <Close />
                </div>
            </div>)}
            <ViewImages isLoadingImages={isLoadingImages} activeFilters={activeFilters} selectedImagesId={selectedImagesId} searchValue={searchValue} handleClickedImages={handleClickedImages} />

            <Button variant={'secondary'} onClick={handlePrint} className="fixed bottom-0 left-0 w-full p-4 text-center">
                Print Images
            </Button>
        </div>
    );
};

export default AdminPrintLayout;