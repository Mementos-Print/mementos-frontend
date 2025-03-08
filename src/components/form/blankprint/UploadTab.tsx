import { useState } from "react";
import { FormDataUploadTab } from "../../../types/type";
import EditPictures from "./EditPictures";
import FileUpload from "./FileUpload";
import { ArrowLeft, CheckIcon, Close } from "../../../assets/icons/Icon";

const UploadTab = ({ Files, handleFilesChange, handleNext, handleSubmit }: FormDataUploadTab) => {
    const [tab, setTab] = useState<'imports' | 'border'>('imports')
    const [borderColor, setBorderColor] = useState<'white' | 'black'>('white')

    const [selectedToPrint, setSelectedToPrint] = useState<File[]>([])

    const handleClickedImages = (file: File) => {
        if (!Object.values(selectedToPrint).includes(file)) {
            AddSelectedImages(file)
        } else {
            RemoveSelectedImages(file)
        }
    }

    const AddSelectedImages = (file: File) => {
        setSelectedToPrint(prevSelection => {
            const updatedSelection = [...prevSelection];
            if (!Object.values(selectedToPrint).includes(file)) {
                updatedSelection.push(file);
            }
            // console.log(selectedToPrint);

            return updatedSelection;
        });
    }

    const RemoveSelectedImages = (file: File) => {
        setSelectedToPrint(selectedToPrint => selectedToPrint.filter((item) => item !== file));
    }

    const RemoveAllSelectedImages = () => {
        setSelectedToPrint([]);
    }
    
    return (
        <div className="w-full h-full">
            <div className="h-fit">
                {Files.length == 0 ?
                    <FileUpload handleFilesChange={handleFilesChange} handleNext={handleNext} />
                    :
                    <div>
                        {selectedToPrint.length != 0 ?
                            <div className="p-3">
                                <div className="cursor-pointer " onClick={() => RemoveAllSelectedImages}><ArrowLeft color="var(--primary)" /></div>
                                <div
                                    className="flex min-w-full overflow-x-auto gap-1 scroll-smooth " style={{scrollbarWidth: 'none' }}
                                >
                                    {selectedToPrint.map((file, index) => (
                                        <div className="min-w-[100px] h-[100px] border-44 border-secondary rounded-xl" key={index}>
                                            <div className="!z-10 -mb-8 mr-2 mt-3 relative right-0 float-right bg-secondary  rounded-full w-fit cursor-pointer"
                                                onClick={() => RemoveSelectedImages(file)}
                                            >
                                                <Close /></div>
                                            <img src={URL.createObjectURL(file)} alt="img" className="h-full w-full object-cover rounded-xl" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            : <span></span>
                        }
                        <EditPictures selectedImages={selectedToPrint} />
                    </div>}
            </div>

            <div className="h-1/2 z-50">
                <div className="flex flex-row justify-between bg-white px-4 py-2 rounded-t-3xl shadow-[0_-6px_12px_rgba(0,0,0,0.08)]">
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
                    <button onClick={handleSubmit} className="bg-secondary py-1 px-4 text-xs text-primary rounded-full absolute right-4">
                        Done
                    </button>
                </div>

                {
                    tab == 'imports' ?
                        <div className="imports flex flex-wrap">
                            {Files.length > 0 && (
                                <ul className='flex flex-wrap'>
                                    {Files.map((file, index) => (
                                        <li key={index} className="w-1/3 border border-gray_ border-collapse hover:cursor-pointer" onClick={() => handleClickedImages(file)}>

                                            {file && <div>
                                                {Object.values(selectedToPrint).includes(file) ?
                                                    <div className="!z-10 -mb-8 ml-2 mt-2 relative left-0 float-left p-1 bg-secondary rounded-full w-fit ">
                                                        <CheckIcon color='var(--primary)' /></div> :
                                                    <span></span>}
                                                <div className="-z-10"><img src={URL.createObjectURL(file)} alt="img" className="" /></div></div>}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        : <div className="borders flex flex-col items-center text-center gap-5 p-2 py-6">
                            <p className="text-disabledText kanit-light text-sm">Select your preferred border.</p>
                            <div className="flex flex-row gap-16">
                                <button onClick={() => setBorderColor('white')}>
                                    {borderColor == 'white' ?
                                        <div className="!z-200 -mt-2 -mr-2 right-0 float-right p-1 bg-secondary rounded-full w-fit ">
                                            <CheckIcon color='var(--primary)' /></div> :
                                        <span></span>}
                                    <div className="w-[40px] h-[40px] rounded-full bg-white shadow-[0px_6px_6px_rgba(0,0,0,0.08)]"
                                        style={{ border: borderColor == 'white' ? '4px solid var(--primary)' : '4px solid white', }}
                                    ></div>
                                </button>
                                <button onClick={() => setBorderColor('black')}>
                                    {borderColor == 'black' ?
                                        <div className="!z-200 -mt-2 -mr-2 right-0 float-right p-1 bg-secondary rounded-full w-fit ">
                                            <CheckIcon color='var(--primary)' /></div> :
                                        <span></span>}
                                    <div className="w-[40px] h-[40px] rounded-full bg-black"
                                        style={{ border: borderColor == 'black' ? '4px solid var(--primary)' : '4px solid white', }}
                                    ></div>
                                </button>
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}
export default UploadTab;