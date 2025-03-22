import React, { useEffect, useState } from 'react';
import { FormDataFileUpload } from '../../../types/type';

const FileUpload = ({ handleFilesChange, handleNext, }: FormDataFileUpload) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setFiles(Array.from(selectedFiles));
        }
    };

    useEffect(() => {
        if (files.length > 0) {
            handleFilesChange(files);
        }
    }, [files, handleFilesChange]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (files.length === 0) {
            alert("Please select at least one file to upload!");
            return;
        }

        const formData = new FormData();
        try {
            files.forEach((file, index) => {
                formData.append(`file${index + 1}`, file);
            });
            handleFilesChange(files);
        } catch (error) {
            console.log(error);
        }

        console.log("Files ready to upload:", files);
        handleNext(e);
    };

    return (
        <div className='flex flex-col w-full'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center py-5'>
                <div className='flex flex-col w-2/3 h-full justify-center items-center gap-4 py-14 border-2 border-primary'>
                    <label htmlFor="browse" className='kanit-medium text-primary font-bold hover:underline bg-secondary px-5 py-2 text-center w-2/3 rounded-full'>Upload Images</label>
                    <input
                        type="file"
                        onChange={handleChange}
                        accept=".jpeg, .png, .jpg, .pdf"
                        multiple
                        hidden
                        id="browse"
                    />
                </div>
            </form>
        </div>
    );
};

export default FileUpload;
