import { FormEvent, useState } from "react";
import { NewUserDataProps } from "../../types/type";
import { useNavigate } from "react-router-dom";
import useStoreContext from "../../hooks/useStoreContext";
import NewUserDataForm from "../../components/form/NewUserDataForm";
import { useSetSelected } from "../../hooks/useSetSelected";

const NewUser = () => {
    const { setStore } = useStoreContext();
    const setSelected = useSetSelected();

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
            setSelected("isAuthenticated", true);

        } catch (error) {
            console.log(error);

        }

        // Navigate to another route after 3 seconds
        setTimeout(() => {
            navigate("/user/dashboard/")
        }, 1000);
    };

    return (
        <div className="kanit-medium bg-[#F5F5F5] h-[80vh] pt-3">
            <div className="px-5 py-3 relative z-10 flex flex-col w-full h-[85%] sm:max-w-[600px] sm:mx-auto sm:mt-10 sm:rounded-sm sm:shadow-lg sm:bg-white sm:pt-10">
                <NewUserDataForm handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default NewUser;