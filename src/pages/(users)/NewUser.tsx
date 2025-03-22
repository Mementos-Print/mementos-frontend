import { FormEvent, useState } from "react";
import { NewUserDataProps } from "../../types/type";
import { useNavigate } from "react-router-dom";
import useStoreContext from "../../useStoreContext";
import NewUserDataForm from "../../components/form/NewUserDataForm";

const NewUser = () => {
    const { setStore } = useStoreContext();
    const [NewUserData, setNewUserData] = useState<NewUserDataProps>({
        name: '',
        email: '',
        date_created: new Date(),
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setNewUserData(prevData => {
            if (name in prevData) {
                (prevData as any)[name] = value;
            }
            return prevData as NewUserDataProps;
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setStore((prevStore: any) => ({
                ...prevStore,
                user: NewUserData
            }));
        } catch (error) {
            console.log(error);
            
        } finally {
            console.log('submitted');
        }

        // Navigate to another route after 3 seconds
        setTimeout(() => {
            navigate("/get-started")
        }, 1000);
    };

    return (
        <div className="kanit-medium bg-[#F5F5F5] h-[88vh]">
            <div className="px-5 py-3 relative z-10 flex flex-col w-full h-[85%]">
                <NewUserDataForm handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default NewUser;