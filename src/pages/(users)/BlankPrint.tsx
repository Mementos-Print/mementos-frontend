import { useNavigate } from "react-router-dom";
import CompletedModal from "../../components/Modals/CompletedModal";
import { FormEvent, useState } from "react";
import Completed from "../../components/form/Completed";
import { FormSectionDataProps } from "../../types/type";
import ProgressBar from "../../components/form/ProgressBar";
import Information from "../../components/form/information";
import Navbar from "../../components/Navbar";
import { BackgroundGradientsEllipses } from "../../assets/icons/Icon";

const Blackprint = () => {
    const [currentSection, setCurrentSection] = useState(1);
    const [done, setDone] = useState<number[]>([0]);

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

    const handlePrevious = () => {
        setCurrentSection(currentSection - 1);
    };

    const [formSectionsData, setFormSectionsData] = useState<FormSectionDataProps>([
        {
            name: '',
            email: '',
            date_submitted: new Date(),
        },
    ]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, section: number) => {
        const { name, value } = e.target;
        console.log(name, value, section);
        console.log(formSectionsData);
        const index = section - 1;

        setFormSectionsData(prevSectionsData => {
            const updatedSectionData = [...prevSectionsData];
            if (name in updatedSectionData[index]) {
                (updatedSectionData[index] as any)[name] = value;
            }
            return updatedSectionData as FormSectionDataProps;
        })
        console.log(formSectionsData);
    }

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
            navigate("/")
        }, 3000); // 3 seconds delay
    };

    const renderSection = () => {
        switch (currentSection) {
            case 1:
                return (
                    <Information sectionData={formSectionsData[0]} activeSection={currentSection} handleChange={handleChange} handleNext={handleNext} />
                );
            case 2:
                return (
                    <div>2</div>

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
        <div  className="kanit-medium h-screen ">
            <div className="absolute inset-0 w-full h-full child:w-full -z-10 object-cover">
                <BackgroundGradientsEllipses />
            </div>
            <Navbar />

            <div className="px-5 py-3 relative z-10 flex flex-col w-full h-fit">
                <ProgressBar activeSection={currentSection} done={done} setcurrentsection={handleSectionChange} />

                <div className="flex h-full ">
                    <div className="w-full p-6">
                        {renderSection()}
                    </div>
                </div>
                <CompletedModal isOpen={showCompletedModal} />
            </div>
        </div >
    );
}

export default Blackprint