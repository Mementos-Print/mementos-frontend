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
        handleFilesChange(files);
    }, [files, handleFilesChange]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (files.length === 0) {
            alert("Please select at least one file to upload!");
            return;
        }

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file${index + 1}`, file);
        });

        console.log("Files ready to upload:", files);
        handleNext(e);
    };

    return (
        <div className='flex flex-col w-full'>
            <h1>File Uploads</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleChange}
                    accept=".jpeg, .png, .jpg, .pdf"
                    multiple
                    className='w-fit'
                />

                <div>
                    {files.length > 0 && (
                        <ul className='flex flex-wrap'>
                            {files.map((file, index) => (
                                <li key={index}>
                                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button
                    type="submit"
                    className="upload-button"
                    disabled={files.length === 0}
                >
                    Upload
                </button>

            </form>
        </div>
    );
};

export default FileUpload;
