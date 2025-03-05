import React, { useState } from 'react';

const FileUpload = () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setFiles(Array.from(selectedFiles));
        }
    };

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

    };

    return (
        <div className="">
            <h1 className="">File Uploads</h1>
            <form onSubmit={handleSubmit}>

                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpeg, .png, .jpg, .pdf"
                    multiple
                />

                <div className="file-list">
                    {files.length > 0 && (
                        <ul className='flex flex-wrap'>
                            {files.map((file, index) => (
                                <li key={index} className="file-item">
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
