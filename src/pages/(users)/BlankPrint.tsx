import { useNavigate } from "react-router-dom";
import CompletedModal from "../../components/Modals/CompletedModal";
import { FormEvent, useEffect, useState } from "react";
import Completed from "../../components/form/Completed";
import { FormSectionDataProps } from "../../types/type";
import ProgressBar from "../../components/form/blankprint/ProgressBar";
import useStoreContext from "../../useStoreContext";
import Information from "../../components/form/information";
import UploadTab from "../../components/form/blankprint/UploadTab";

const Blackprint = () => {
    const [currentSection, setCurrentSection] = useState(2);
    const [done, setDone] = useState<number[]>([0]);
    const [_files, setFiles] = useState<File[]>([]);

    const { store, setStore } = useStoreContext();
    useEffect(() => {
        // Check if user data is not empty
        if (store.user && Object.keys(store.user).length > 0) {
            setDone(prevDone => {
                const updatedDone = [...prevDone];
                updatedDone.push(1);
                return updatedDone;
            });
        } else {
            setCurrentSection(1);
        }
    }, [store.user]);

    const handleInformationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, saveInfo: Boolean = false) => {
        const { name, value } = e.target;

        setFormSectionsData(prevSectionsData => {
            const updatedSectionData = [...prevSectionsData];
            if (name in updatedSectionData[0]) {
                (updatedSectionData[0] as any)[name] = value;
            }
            if (saveInfo) {
                (updatedSectionData[0] as any)[`saveInfo`] = saveInfo
            }
            return updatedSectionData as FormSectionDataProps;
        })
    }

    const handleInformationSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setStore((prevStore: any) => ({
                ...prevStore,
                user: formSectionsData[0]
            }));
        } catch (error) {
            console.log(error);

        } finally {
            console.log(formSectionsData[0], 'submitted');
        }
    }

    const navigate = useNavigate();
    const [showCompletedModal, setShowCompletedModal] = useState(false);

    const handleSectionChange = (a: number) => {
        setCurrentSection(a);
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

    // const handlePrevious = () => {
    //     setCurrentSection(currentSection - 1);
    // };

    const [formSectionsData, setFormSectionsData] = useState<FormSectionDataProps>([
        {
            name: '',
            email: '',
            saveInfo: false,
            date_created: new Date(),
        },
        {
            files: [],
        }
    ]);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, section: number) => {
    //     const { name, value } = e.target;
    //     console.log(name, value, section);
    //     console.log(formSectionsData);
    //     const index = section - 1;

    //     setFormSectionsData(prevSectionsData => {
    //         const updatedSectionData = [...prevSectionsData];
    //         if (name in updatedSectionData[index]) {
    //             (updatedSectionData[index] as any)[name] = value;
    //         }
    //         return updatedSectionData as FormSectionDataProps;
    //     })
    //     console.log(formSectionsData);
    // }

    const handleSubmit = () => {
        // You can also clear the local storage if needed
        localStorage.removeItem('formSectionsData');

        console.log('submittedd');
        // Show Completed modal
        setShowCompletedModal(true);

        // Navigate to another route after 3 seconds
        setTimeout(() => {
            setShowCompletedModal(false);
            navigate("/")
        }, 3000); // 3 seconds delay
    };

    const handleFileChange = (files: File[]) => {
        setFiles(prevSectionsData => {
            const updatedSectionData = [...prevSectionsData, ...files];
            return updatedSectionData;
        });

        const name = 'files'
        setFormSectionsData(prevSectionsData => {
            const updatedSectionData = [...prevSectionsData];
            (updatedSectionData[1] as any)[name] = files;
            return updatedSectionData as FormSectionDataProps;
        });
    };

    const renderSection = () => {
        switch (currentSection) {
            case 1:
                return (
                    <Information handleChange={handleInformationChange} handleNext={handleNext} handleSubmit={handleInformationSubmit} />
                );
            case 2:
                return (
                    <UploadTab Files={formSectionsData[1].files} handleFilesChange={handleFileChange} handleNext={handleNext} handleSubmit={handleSubmit}/> 
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
        <div className="kanit-medium bg-[#F5F5F5] ">
            <div className="px-5 py-3 relative z-10 flex flex-col w-full h-[88%]">
                <ProgressBar activeSection={currentSection} done={done} setcurrentsection={handleSectionChange} />

                <div className="flex h-full w-full pt-6">
                    {renderSection()}
                </div>
                <CompletedModal isOpen={showCompletedModal} />
            </div>
        </div >
    );
}

export default Blackprint