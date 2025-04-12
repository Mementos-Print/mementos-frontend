import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "../../components/form/AdminLoginForm";
import { AdminLogin } from "../../api/adminAuth";
import useStoreContext from "../../hooks/useStoreContext";
import { useSetSelected } from "../../hooks/useSetSelected";
import { AdminDataProps } from "../../types/type";

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const setSelected = useSetSelected();
    const { setStore } = useStoreContext();

    const handleSubmit = async (formData: AdminDataProps) => {
        try {
            setLoading(true);
            const authToken = await AdminLogin({
                email: formData.email.trim(),
                password: formData.password.trim()
            });

            localStorage.setItem('authToken', authToken);
            setSelected("isAuthenticated", true);
            setSelected("accessToken", authToken);

            setStore((prevStore: any) => ({
                ...prevStore,
                user: {
                    email: formData.email,
                    name: formData.name
                }
            }));

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
                <AdminLoginForm onSubmit={handleSubmit} loading={loading} />
            </div>
        </div>
    );
};

export default LoginAdmin;