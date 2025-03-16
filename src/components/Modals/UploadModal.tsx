import { UploadProps } from "../../types/type";
import useStoreContext from "../../useStoreContext";
import { SaveSelectedImages } from "../SaveSelectedImages";
import { Button } from "../ui/Button";


const UploadModal = ({ isOpen, handleNext }: UploadProps) => {
    const { borderColor, selectedToPrint, setSelectedToPrint } = useStoreContext();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Clear local storage if needed
        localStorage.removeItem('formSectionsData');


        const status: boolean = await SaveSelectedImages(borderColor, selectedToPrint);

        if (status) {
            console.log('Submitted');
            setSelectedToPrint([]);
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
                        className="py-4 px-8"
                    >
                        <p className="text-white font-semibold text-lg">Upload Image(s)</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;