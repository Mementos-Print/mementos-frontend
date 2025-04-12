import { UploadProps } from "../../types/type";
import useStoreContext from "../../hooks/useStoreContext";
import { SaveSelectedImages } from "../SaveSelectedImages";
import { Button } from "../ui/Button";
import { useState } from "react";
import axios from "axios";


const UploadModal = ({ isOpen, handleNext }: UploadProps) => {
    const { store } = useStoreContext();
    const [isUploading, setIsUploading] = useState(false);
    const { setStore } = useStoreContext();

    if (!isOpen) return null;

    const handleUploadBlankImages = async () => {
        if (store.selectedToPrint.length < 2) {
            alert('Please select at least 2 images');
            return;
        }

        setIsUploading(true);
        
        try {
            const formData = new FormData();
            formData.append('borderColor', store.border);
            
            // Add each file to the form data
            store.selectedToPrint.forEach((file: File) => {
                formData.append('images', file);
            });
            const authToken = localStorage.getItem('token') || '';

            const response = await axios.post(
                'https://mementos-backend.onrender.com/images/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${authToken}`
                    }
                }
            );

            console.log('Upload successful:');
            
            // Update your store with the response
            setStore(prevStore => ({
                ...prevStore,
                uploadedImages: response.data
            }));
            return response.data ? true : false;
        } catch (error) {
            console.error('Upload failed:', error);
            // Handle error (show toast, etc.)
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Clear local storage if needed
        localStorage.removeItem('store');
        e.preventDefault();

        const status: boolean = await SaveSelectedImages(store.border, store.selectedToPrint);
        const uploadStatus = await handleUploadBlankImages();

        if (status || uploadStatus) {
            console.log('Submitted');
            handleNext(e);

        } else {
            console.log('error');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center shadow-xl z-50">
            <div className="relative bg-gray_2 px-5 py-20 rounded-lg shadow-[0_15px_20px] shadow-shadow shadow-opacity-80 flex flex-col items-center gap-12 w-[90%] h-[40%] m-auto">
                <div className="flex flex-col justify-center text-center">
                    <h2 className="font-bold">All Set</h2>
                    <p className="text-[12px] font-normal">Upload Image(s) for printing</p>
                </div>

                <div className="absolute bottom-14">
                    <Button
                        variant="default"
                        onClick={(e) => handleSubmit(e)}
                        className="py-4 px-8 w-full"
                        disabled={isUploading || store.selectedToPrint.length < 2}
                    >
                        <p className="text-white font-semibold text-lg">{isUploading ? 'Uploading...' : 'Upload Image(s)'}</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;