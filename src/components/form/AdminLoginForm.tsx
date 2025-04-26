import { useForm } from "react-hook-form";
import { ArrowRight, GoogleIcon } from "../../assets/icons/Icon";
import { AdminDataProps, AdminLoginFormProps } from "../../types/type";
import { toast } from 'react-toastify';
import { useState } from "react";

const AdminLoginForm = ({ onSubmit, loading }: AdminLoginFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<AdminDataProps>({ mode: "onChange" });

    const [showPassword, setShowPassword] = useState(false);

    const submitForm = (data: AdminDataProps) => {
        if (!data.email.trim() || !data.password.trim()) {
            toast.error('Please fill in all fields');
            return;
        }
        onSubmit(data);
    };

    const handleContinueWithGoogle = () => {
        console.log('continue with google');
    };

    return (
        <form className="flex flex-col h-full justify-start w-full" onSubmit={handleSubmit(submitForm)}>
            <div>
                <div className='text-primary flex flex-col justify-start'>
                    <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-normal text-gray_1">
                        Name <span className="text-red-700">*</span>
                    </label>
                    <input
                        className="border p-2 mb-4 w-full rounded-md bg-[#F5F5F5] border-[#E0E0E0] text-[16px] font-light"
                        placeholder='Name'
                        {...register("name", { required: true })}
                        type="text"
                        autoComplete="name"
                    />
                    {errors.name && <span className="error-message text-red-400 text-xs font-light">This field is required</span>}
                </div>

                <div className='text-primary'>
                    <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-normal text-gray_1">
                        Email <span className="text-red-700">*</span>
                    </label>
                    <input
                        className="border p-2 mb-4 w-full rounded-md bg-[#F5F5F5] border-[#E0E0E0] text-[16px] font-light"
                        placeholder='Email'
                        {...register("email", { 
                            required: true,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        type="email"
                        autoComplete="email"
                    />
                    {errors.email && (
                        <span className="error-message text-red-400 text-xs font-light">
                            {errors.email.message || "This field is required"}
                        </span>
                    )}
                </div>

                <div className='text-primary flex flex-col justify-start'>
                    <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-normal text-gray_1">
                        Password <span className="text-red-700">*</span>
                    </label>
                    <div className="flex flex-row justify-between items-center h-full border p-2 mb-4 rounded-md bg-[#F5F5F5] border-[#E0E0E0] text-[16px] font-light">
                        <input
                            className="bg-[#F5F5F5] focus:outline-none w-full"
                            placeholder='Password'
                            {...register("password", { 
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="flex flex-row justify-center items-center h-full text-xs text-gray-600"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.password && (
                        <span className="error-message text-red-400 text-xs font-light">
                            {errors.password.message || "This field is required"}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-col pt-10 gap-3 justify-center text-[12px]">
                <button
                    type="submit"
                    className="px-4 py-2 rounded-full w-full flex flex-row justify-center text-[16px] gap-2 hover:bg-secondary/80"
                    style={{
                        backgroundColor: !isValid ? 'var(--disabled)' : 'var(--secondary)',
                        color: !isValid ? 'var(--disabledText)' : 'var(--primary)',
                    }}
                    disabled={!isValid || loading}
                >
                    {loading ? <p>Loading...</p> : <p>Login</p>}
                    <ArrowRight color={!isValid ? 'var(--disabledText)' : 'var(--primary)'} />
                </button>

                <p className="text-gray_3 w-full text-center py-1">OR</p>

                <button 
                    type="button"
                    onClick={handleContinueWithGoogle} 
                    className="bg-primary text-white px-4 py-2 rounded-full w-full flex flex-row gap-2 justify-center text-[16px]"
                >
                    <GoogleIcon />
                    <p>Continue with Google</p>
                </button>
            </div>
        </form>
    );
};

export default AdminLoginForm;