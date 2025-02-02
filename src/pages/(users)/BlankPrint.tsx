// src/pages/ChapterPage.js
import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReportBar from './ReportBar';
import { useLocation } from 'react-router-dom';
import Preview from './Preview';
import { DataProps, FormSectionProgrammeProps } from '../../../types/NewReportForm';
import FileUpload from './FilesUpload';
import ProgrammeReport from './ProgrammeReport';
import SuccessModal from '../../Modals/SuccessModal';

const BlantPrint = () => {
    const [currentSection, setCurrentSection] = useState(1);
    const [done, setDone] = useState<number[]>([0]);
    const [files, setFiles] = useState<File[]>([]);

    const location = useLocation();
    const data = location.state;

    const initialData = location.state as DataProps;
    const [formSectionsData, setFormSectionsData] = useState<FormSectionProgrammeProps>([
        {
            month: initialData.month,
            year: initialData.year,
            title: initialData.title,
            reportType: initialData.reportType,
            date_submitted: initialData.date_submitted,
        },
        {
            nameOfProgramme: '',
            date: new Date(),
            attendance: {
                workforce: 0, 
                newComers: 0, 
                totalAttendance: 0 },
            otherInformation: '',
            comments: ''
        },
        {
            uploadedFiles: [],
        }
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
                return updatedSectionData as FormSectionProgrammeProps;
            });
        } else {
            setFormSectionsData(prevSectionsData => {
                const updatedSectionData = [...prevSectionsData];
                if (name in updatedSectionData[section]) {
                    (updatedSectionData[section] as any)[name] = value;
                }
                return updatedSectionData as FormSectionProgrammeProps;
            });
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormSectionsData(prevSectionsData => {
            const updatedSectionData = [...prevSectionsData];
            (updatedSectionData[0] as any)[name] = value;
            return updatedSectionData as FormSectionProgrammeProps;
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
            return updatedSectionData as FormSectionProgrammeProps;
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
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // alert('Form submitted');

        // You can also clear the local storage if needed
        localStorage.removeItem('formSectionsData');

        console.log('submittedd');
        // Show success modal
        setShowSuccessModal(true);

        // Navigate to another route after 3 seconds
        setTimeout(() => {
            setShowSuccessModal(false);
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
                    <ProgrammeReport sectionData={formSectionsData[1]} activeSection={currentSection} handleChange={handleChange} handleNext={handleNext} />
                );
            case 2:
                return (
                    <FileUpload handleFilesChange={handleFileChange}  handleChange={handleChange} handleNext={handleNext} handlePrevious={handlePrevious} />
                );
            case 3:
                return (
                    <Preview formData={formSectionsData} setcurrentsection={handleSectionChange} handleSubmit={handleSubmit} />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex h-full">
                <div className="w-3/4 p-6">
                    {/* <Outlet /> */}
                    <div className='flex flex-row justify-start items-center gap-2'>
                        <ArrowBackIcon />
                        <Link to="/chapter/reports" >
                            <div>Reports</div>
                        </Link>
                        <div className=' font-bold'>{`/ ${data?.reportType}`}</div>
                    </div>

                    <div className="p-4">
                        {renderSection()}
                    </div>
                </div>

                <ReportBar activeSection={currentSection} done={done} setcurrentsection={handleSectionChange} handleTitleChange={handleTitleChange} sectionData={formSectionsData[0]}/>
            </div>
            <SuccessModal isOpen={showSuccessModal} />
        </div>
    );
};

export default BlantPrint;

