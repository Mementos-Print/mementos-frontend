import { useNavigate } from "react-router-dom";
import { ArrowRight, SuccessCheckIcon } from "../../assets/icons/Icon";
import { CompletedProps } from "../../types/type";
import { Button } from "../ui/Button";


const CompletedModal = ({ isOpen }: CompletedProps) => {
    const navigate = useNavigate();
    if (!isOpen) return null;

    const handleHome = () => {
        navigate("/")
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center shadow-xl z-50">
            <div className="relative bg-gray_2 px-5 py-12 rounded-2xl shadow-[0_15px_20px] shadow-shadow shadow-opacity-80 flex flex-col items-center w-[90%] h-[45%] m-auto">
                <div className="flex flex-col justify-center items-center text-center">
                    <div className=' rounded-full flex justify-center items-center mb-3'>
                        <SuccessCheckIcon color="var(--primary)" />
                    </div>
                    <h2 className="font-extrabold text-xl text-[var(--primary)]">Postcard Generated!</h2>
                    <p className="text-[12px] w-3/4 font-normal">We are Inking your memory, it will only take a few minutes</p>
                </div>

                <div className="absolute bottom-16">
                    <Button
                        variant="default"
                        onClick={() => handleHome()}
                        className="py-4 px-6 w-full"
                    >
                        <div className="flex items-center gap-3">
                            <p className="text-white font-bold text-sm">Back to home</p>

                            <div className="text:white">
                                <ArrowRight color="white" />
                            </div>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompletedModal;