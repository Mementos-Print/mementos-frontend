import { useState } from "react";
import { NewUserDataProps } from "../../types/type";
import { useNavigate } from "react-router-dom";
import useStoreContext from "../../hooks/useStoreContext";
import NewUserDataForm from "../../components/form/NewUserDataForm";
import { useSetSelected } from "../../hooks/useSetSelected";
import { loginUser } from '../../api/userAuth'

const NewUser = () => {
  const { setStore } = useStoreContext();
  const setSelected = useSetSelected();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: NewUserDataProps) => {
    try {
      setLoading(true);
      const authToken = await loginUser(formData);

      localStorage.setItem('authToken', authToken);
      setSelected("isAuthenticated", true);
      setSelected("accessToken", authToken);

      setStore((prevStore: any) => ({
        ...prevStore,
        user: {
          name: formData.name,
          email: formData.email,
          role: 'user'
        }
      }));

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
        <NewUserDataForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}

export default NewUser;