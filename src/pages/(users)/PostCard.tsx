import { FormEvent, useCallback, useEffect, useState } from "react";
import Completed from "../../components/form/Completed";
import { FormSectionDataProps } from "../../types/type";
import ProgressBar from "../../components/form/postcard/ProgressBar";
import useStoreContext from "../../hooks/useStoreContext";
import Information from "../../components/form/information";
import UploadTab from "../../components/form/postcard/UploadTab";
import UploadModal from "../../components/Modals/UploadModal";

const PostCard = () => {
    const [currentSection, setCurrentSection] = useState(2);
    const [done, setDone] = useState<number[]>([0]);
    const [_files, setFiles] = useState<File[]>([]);

    const { store, setStore } = useStoreContext();
    useEffect(() => {
        // Check if user data is not empty
        if (store.user && Object.keys(store.user)?.length > 0) {
            setDone(prevDone => {
                const updatedDone = [...prevDone];
                updatedDone.push(1);
                return updatedDone;
            });
        } else {
            setCurrentSection(1);
        }
    }, [store.user]);

    const handleInformationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormSectionsData(prevSectionsData => {
            const updatedSectionData = [...prevSectionsData];
            if (name in updatedSectionData[0]) {
                (updatedSectionData[0] as any)[name] = value;
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

        }
    }

    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleSectionChange = (a: number) => {
        setCurrentSection(a);
    };

    const handleNext = (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDone(prevDone => {
            const updatedDone = [...prevDone];
            updatedDone.push(currentSection);
            return updatedDone;
        });
        setCurrentSection(currentSection + 1);
        if (currentSection == 2) setShowCompletedModal(true);
    };

    // const handlePrevious = () => {
    //     setCurrentSection(currentSection - 1);
    // };

    const [formSectionsData, setFormSectionsData] = useState<FormSectionDataProps>([
        {
            name: '',
            email: '',
            date_created: new Date(),
        },
        {
            files: [],
        }
    ]);


    const handleFileChange = useCallback((files: File[]) => {
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

        try {
            setStore((prevStore: any) => ({
                ...prevStore,
                importedImages: formSectionsData[1]
            }));
        } catch (error) {
            console.log(error);

        } finally {
            console.log('saved');
        }

    }, []);

    const renderSection = () => {
        switch (currentSection) {
            case 1:
                return (
                    <Information handleChange={handleInformationChange} handleNext={handleNext} handleSubmit={handleInformationSubmit} />
                );
            case 2:
                return (
                    <UploadTab Files={formSectionsData[1].files} handleFilesChange={handleFileChange} handleNext={handleNext} setShowUploadModal={setShowUploadModal} />
                );
            case 3:
                
                return (
                    <Completed isOpen={showCompletedModal} />
                );
            default:
                return null;
        }
    };

    return (
        <div className="kanit-medium bg-[#F5F5F5] ">
            <div className="relative z-10 flex flex-col w-full h-[88%]">
                <ProgressBar activeSection={currentSection} done={done} setcurrentsection={handleSectionChange} />

                <div className="flex h-[78vh] w-full">
                    {renderSection()}
                </div>
                <UploadModal isOpen={showUploadModal} handleNext={handleNext} />
            </div>
        </div >
    );
}

export default PostCard