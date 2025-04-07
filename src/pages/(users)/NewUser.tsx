import { FormEvent, useState } from "react";
import { NewUserDataProps } from "../../types/type";
import { useNavigate } from "react-router-dom";
import useStoreContext from "../../hooks/useStoreContext";
import NewUserDataForm from "../../components/form/NewUserDataForm";
import { useSetSelected } from "../../hooks/useSetSelected";
import { loginUser } from '../../api/userAuth'

const NewUser = () => {
    const { setStore } = useStoreContext();
    const setSelected = useSetSelected();
    const [loading, setLoading] = useState(Boolean);

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, formData: {name: string, email: string}) => {
        e.preventDefault();
        
        try {
          setLoading(true);
          
          // Call the imported login function
          const authToken = await loginUser(formData);
    
          // Store the token and update state
          localStorage.setItem('authToken', authToken);
          setSelected("isAuthenticated", true);
          setSelected("accessToken", authToken);
    
          // Update store with user data
          setStore((prevStore: any) => ({
            ...prevStore,
            user: {
              ...NewUserData,
              name: formData.name,
              email: formData.email
            }
          }));
    
          // Navigate to dashboard after a short delay
          setTimeout(() => {
            navigate("/user/dashboard");
          }, 1000);
    
        } catch (error) {
          console.error('Login failed:', error);
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className="kanit-medium bg-[#F5F5F5] h-[80vh] pt-3">
            <div className="px-5 py-3 relative z-10 flex flex-col w-full h-[85%] sm:max-w-[600px] sm:mx-auto sm:mt-10 sm:rounded-sm sm:shadow-lg sm:bg-white sm:pt-10">
                <NewUserDataForm handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />
            </div>
        </div>
    );
}

export default NewUser;