import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStoreContext from "../../useStoreContext";
import AdminLoginForm from "../../components/form/AdminLoginForm";

const LoginAdmin = () => {
    const {  login, isLoading, error } = useStoreContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        // username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // for (let i = 0; i < admin.length; i++) {
            //     if (
            //         admin[i].username === formData.username &&
            //         admin[i].email === formData.email &&
            //         admin[i].password === formData.password
            //     ) {
            //         login(formData.username, formData.password);
            //         navigate("/admin/get-started");
            //         return;
            //     }
            // }
            await login(formData);
            navigate("/admin/get-started");
            return;
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="kanit-medium bg-[#F5F5F5] h-[88vh]">
            <div className="px-5 py-3 relative z-10 flex flex-col w-full h-[85%]">
                {error && <div className="text-red-500">{error}</div>}
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <AdminLoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
                )}
            </div>
        </div>
    );
};

export default LoginAdmin;