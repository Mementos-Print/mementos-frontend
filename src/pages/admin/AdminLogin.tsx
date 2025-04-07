import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "../../components/form/AdminLoginForm";
import { AdminLogin } from "../../api/adminAuth"
import useStoreContext from "../../hooks/useStoreContext";
import { useSetSelected } from "../../hooks/useSetSelected";

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(Boolean);
    const setSelected = useSetSelected();
    const { setStore } = useStoreContext();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, formData: {name: string, email: string, password: string}) => {
        e.preventDefault();

        const loginData = {
            email: formData.email,
            password: formData.password,
        };
        
        try {
          setLoading(true);
          
          const authToken = await AdminLogin(loginData);
    
          // Store the token and update state
          localStorage.setItem('authToken', authToken);
          setSelected("isAuthenticated", true);
          setSelected("accessToken", authToken);
    
          // Update store with user data
          setStore((prevStore: any) => ({
            ...prevStore,
            user: {
              password: loginData.password,
              email: loginData.email
            }
          }));
    
          // Navigate to dashboard after a short delay
          setTimeout(() => {
            navigate("/admin/get-started");
          }, 1000);
    
        } catch (error) {
          console.error('Login failed:', error);
        } finally {
          setLoading(false);
        }
    };

    return (
        <div className="kanit-medium bg-[#F5F5F5] h-[88vh]">
            <div className="px-5 py-3 relative z-10 flex flex-col w-full h-[85%]">
            <AdminLoginForm handleChange={handleChange} handleSubmit={handleSubmit} loading={loading}/>
            </div>
        </div>
    );
};

export default LoginAdmin;