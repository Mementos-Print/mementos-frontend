import { toast } from "react-toastify";
import { fetchAdminImages } from "../api/adminAuth";

export interface ImageProps {
    imageid: string;
    imageurl: string;
    name: string;
}

export const fetchImages = async (): Promise<ImageProps[]> => {
    try {
        const response = await fetchAdminImages();
        const images = response.AllImages || [];
        return images;
    } catch (error) {
        console.error('Fetching images failed:', error);
        toast.error('Failed to fetch images');
        return [];
    }
};