import { FormDataBlackPrint } from "../../types/type";

const BlankPrint = ({handleChange, handleFilesChange, activeSection, handleNext, handlePrevious}: FormDataBlackPrint) => (
    <div>
        Blackprint
    </div>
  );
  
  export default BlankPrint;

  // src/pages/ChapterPage.js
import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { DataProps, FormSectionDataProps } from '../../types/type';
import Information from './NewUserDataForm';
import BlankPrint from '../../components/form/BlankPrint';
import Completed from '../../components/form/Completed';
import CompletedModal from '../../components/Modals/CompletedModal';
import ProgressBar from '../../components/form/ProgressBar';

const BlantPrint = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [done, setDone] = useState<number[]>([0]);
    const [files, setFiles] = useState<File[]>([]);

    const location = useLocation();
    const data = location.state;

    const initialData = location.state as DataProps;
    const [formSectionsData, setFormSectionsData] = useState<FormSectionDataProps>([
        {
            name: initialData.name,
            email: initialData.email,
            date_submitted: initialData.date_submitted,
        },
    ]);

    // Load form data from local storage when the component mounts
    useEffect(() => {
        const savedFormSectionsData = localStorage.getItem('formSectionsData');
        if (savedFormSectionsData) {
            setFormSectionsData(JSON.parse(savedFormSectionsData));
        }
    }, []);

    // Save form data to local storage whenever formSectionsData changes
    useEffect(() => {
        localStorage.setItem('formSectionsData', JSON.stringify(formSectionsData));
        console.log(formSectionsData);
    }, [formSectionsData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, section: number) => {
        const { name, value } = e.target;
        const [parentKey, childKey] = name.split(' ');

        if (childKey && (parentKey === 'attendance')) {
            setFormSectionsData(prevSectionsData => {
                const updatedSectionData = [...prevSectionsData];
                if (parentKey in updatedSectionData[section]) {
                    console.log(currentSection);
                    (updatedSectionData[section] as any)[parentKey][childKey] = value;
                }
                return updatedSectionData as FormSectionDataProps;
            });
        } else {
            setFormSectionsData(prevSectionsData => {
                const updatedSectionData = [...prevSectionsData];
                if (name in updatedSectionData[section]) {
                    (updatedSectionData[section] as any)[name] = value;
                }
                return updatedSectionData as FormSectionDataProps;
            });
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormSectionsData(prevSectionsData => {
            const updatedSectionData = [...prevSectionsData];
            (updatedSectionData[0] as any)[name] = value;
            return updatedSectionData as FormSectionDataProps;
        });
    };

    const handleFileChange = (files: File[]) => {
        setFiles(prevSectionsData => {
            const updatedSectionData = [...prevSectionsData, ...files];
            return updatedSectionData;
        });
        const name = 'uploadedFiles'
        setFormSectionsData(prevSectionsData => {
            const updatedSectionData = [...prevSectionsData];
            (updatedSectionData[5] as any)[name] = files;
            return updatedSectionData as FormSectionDataProps;
        });
    };

    const handleNext = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDone(prevDone => {
            const updatedDone = [...prevDone];
            updatedDone.push(currentSection);
            return updatedDone;
        });
        console.log(done);
        setCurrentSection(currentSection + 1);
    };

    const handlePrevious = () => {
        setCurrentSection(currentSection - 1);
    };

    const navigate = useNavigate();
    const [showCompletedModal, setShowCompletedModal] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // alert('Form submitted');

        // You can also clear the local storage if needed
        localStorage.removeItem('formSectionsData');

        console.log('submittedd');
        // Show Completed modal
        setShowCompletedModal(true);

        // Navigate to another route after 3 seconds
        setTimeout(() => {
            setShowCompletedModal(false);
            navigate("/chapter/reports")
        }, 3000); // 3 seconds delay
    };

    const handleSectionChange = (a: number) => {
        setCurrentSection(a);
    };

    const renderSection = () => {
        switch (currentSection) {
            case 1:
                return (
                    <Information sectionData={formSectionsData[0]} activeSection={currentSection} handleChange={handleChange} handleNext={handleNext} />
                );
            case 2:
                return (
                    <BlankPrint handleFilesChange={handleFileChange} activeSection={currentSection} handleChange={handleChange} handleNext={handleNext} handlePrevious={handlePrevious} />
                );
            case 3:
                return (
                    <Completed />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <ProgressBar activeSection={currentSection} done={done} setcurrentsection={handleSectionChange} sectionData={formSectionsData[0]} />

            <div className="flex h-full">
                <div className="w-3/4 p-6">
                    Hii
                    <div className="p-4">
                        {renderSection()}
                    </div>
                </div>

            </div>
            <CompletedModal isOpen={showCompletedModal} />
        </div>
    );
};

export default BlantPrint;

