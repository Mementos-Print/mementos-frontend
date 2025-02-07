import { CheckIcon } from "../../assets/icons/Icon";
import { CompletedProps } from "../../types/type";


const CompletedModal = ({ isOpen }: CompletedProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center shadow-xl z-50">
            <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-center items-center w-[400px] m-auto gap-2">
                <div className=' rounded-full w-[50px] h-[50px] flex justify-center items-center text-white bg-primary mb-3'>
                    <CheckIcon />
                </div>
                <h2 className="font-bold">Successfully Completed</h2>
                <p className="text-[12px]">You will be rediredted</p>
            </div>
        </div>
    );
};

export default CompletedModal;