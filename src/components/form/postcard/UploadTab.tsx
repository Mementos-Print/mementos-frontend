import { useState } from "react";
import { FormDataUploadTab } from "../../../types/type";
import EditPictures from "./EditPictures";
import FileUpload from "./FileUpload";
import { ArrowLeft, CheckIcon, Close } from "../../../assets/icons/Icon";
import useStoreContext from "../../../hooks/useStoreContext";

const UploadTab = ({ Files, handleFilesChange, handleNext, setShowUploadModal }: FormDataUploadTab) => {
    const [tab, setTab] = useState<'imports' | 'border'>('imports')
    const {
        store,
        AddSelectedImages,
        RemoveSelectedImages,
        RemoveAllSelectedImages,
        setBorderColor,
    } = useStoreContext();


    const handleClickedImages = (file: File) => {
        if (!(file instanceof File)) {
            console.error("Invalid file detected:", file);
            return;
        }
        if (!Object.values(store.selectedToPrint).includes(file)) {
            AddSelectedImages(file);
        } else {
            RemoveSelectedImages(file);
        }
    };

    const handleDone = () => {
        setShowUploadModal(true)

        // Close modal after 4 seconds
        setTimeout(() => {
            setShowUploadModal(false);
        }, 3000);
    }

    return (
        <div className="w-full h-full">
            <div className={`${store.selectedToPrint.length == 0 ? 'h-1/2' : ''}`}>
                {store.importedImages.length == 0 ?
                    <FileUpload handleFilesChange={handleFilesChange} handleNext={handleNext} />
                    :
                    <div className="h-full flex flex-col justify-center align-middle">
                        {store.selectedToPrint.length != 0 &&
                            <div className=" h-1/3  p-2">
                                <div className="cursor-pointer pb-1" onClick={() => RemoveAllSelectedImages()}><ArrowLeft color="var(--primary)" /></div>
                                <div
                                    className="flex min-w-full h-full overflow-x-auto gap-1 scroll-smooth " style={{ scrollbarWidth: 'none' }}
                                >
                                    {store.selectedToPrint.map((file, index) => {
                                        if (!(file instanceof File)) {
                                            console.error('Invalid file object:', file);
                                            return null; // or handle this case appropriately
                                        }
                                        const url = URL.createObjectURL(file);
                                        return (
                                            <div className="min-w-[70px] h-[70px] border-44 border-secondary rounded-xl" key={index}>
                                                <div className="!z-10 -mb-8 mr-2 mt-3 relative right-0 float-right bg-secondary  rounded-full w-fit cursor-pointer"
                                                    onClick={() => RemoveSelectedImages(file)}
                                                >
                                                    <Close /></div>
                                                <img src={url} alt="img" className="h-full w-full object-cover rounded-xl" />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                        <EditPictures selectedImages={store.selectedToPrint} />
                    </div>}
            </div>

            <div className="h-1/2 z-50 mt-3">
                <div className="flex flex-row justify-center bg-white px-4 py-2 rounded-t-3xl shadow-[0_-6px_12px_rgba(0,0,0,0.08)]">
                    <div className="">
                        <button
                            onClick={() => setTab('imports')}
                            className="bg-primary py-1 px-4 text-xs text-primary rounded-full"
                            style={{ backgroundColor: tab == 'imports' ? 'var(--primary)' : 'var(--gray3)', color: tab == 'imports' ? 'var(--gray_)' : 'var(--primary)' }}
                        >
                            Imports
                        </button>
                        <button
                            onClick={() => setTab('border')} className="bg-disabled py-1 px-4 text-xs text-primary rounded-full"
                            style={{ backgroundColor: tab == 'border' ? 'var(--primary)' : 'var(--gray3)', color: tab == 'border' ? 'var(--gray_)' : 'var(--primary)' }}
                        >
                            Border
                        </button>
                    </div>
                    <button onClick={() => handleDone()} className="bg-secondary py-1 px-4 text-xs text-primary rounded-full absolute right-4">
                        Done
                    </button>
                </div>

                {
                    tab == 'imports' ?
                        <div className="">
                            {Files.length > 0 && (
                                <div className='grid grid-cols-3 md:grid-cols-4 gap-0.5 px-1'>
                                    {Files.map((file, index) => (
                                        <div key={index} className=""
                                            onClick={() => handleClickedImages(file)}
                                        >
                                            {file && <div className="relative overflow-hidden w-full aspect-square border border-gray_ border-collapse hover:cursor-pointer">
                                                {Object.values(store.selectedToPrint).includes(file) ?
                                                    <div className="!z-10 -mb-8 ml-2 mt-2 relative left-0 float-left p-1 bg-secondary rounded-full w-fit ">
                                                        <CheckIcon color='var(--primary)' /></div> :
                                                    <span></span>}
                                                <div className="-z-10 w-full h-full">
                                                    <img src={URL.createObjectURL(file)} alt="img" className="object-cover w-full h-full" />
                                                </div>
                                            </div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        : <div className="borders flex flex-col items-center text-center gap-5 p-2 py-6">
                            <p className="text-disabledText kanit-light text-sm">Select your preferred border.</p>
                            <div className="flex flex-row gap-12">
                                <button onClick={() => setBorderColor('white')}>
                                    <div className="flex flex-row gap-3 items-center ">
                                        <div>
                                            {store.border == 'white' ?
                                                <div className="!z-200 -mt-2 -mr-2 right-0 float-right p-1 bg-secondary rounded-full w-fit ">
                                                    <CheckIcon color='var(--primary)' /></div> :
                                                <span></span>}
                                            <div className="w-[40px] h-[40px] rounded-full bg-white shadow-[0px_6px_6px_rgba(0,0,0,0.08)]"
                                                style={{ border: store.border == 'white' ? '4px solid var(--primary)' : '4px solid white', }}
                                            ></div>
                                        </div>
                                        <p className="text-disabledText text-lg kanit-light">white</p>
                                    </div>
                                </button>
                                <button onClick={() => setBorderColor('black')}>
                                    <div className="flex flex-row gap-3 items-center ">
                                        <div>
                                            {store.border == 'black' ?
                                                <div className="!z-200 -mt-2 -mr-2 right-0 float-right p-1 bg-secondary rounded-full w-fit ">
                                                    <CheckIcon color='var(--primary)' /></div> :
                                                <span></span>}
                                            <div className="w-[40px] h-[40px] rounded-full bg-black"
                                                style={{ border: store.border == 'black' ? '4px solid var(--primary)' : '4px solid white', }}
                                            ></div>
                                        </div>
                                        <p className="text-disabledText text-lg kanit-light">black</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}
export default UploadTab;