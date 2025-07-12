import { useForm } from "react-hook-form";
import { ArrowRight } from "../../assets/icons/Icon";
import { NewUserDataFormProps, NewUserDataProps } from "../../types/type";
import { useAppState } from "../../hooks/useAppState";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import GoogleAuth from "../../pages/auth/GoogleAuth";

const NewUserDataForm = ({ onSubmit, loading }: NewUserDataFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewUserDataProps>({ mode: "onChange" });
  
  const { isAuthenticated } = useAppState();

  const submitForm = (data: NewUserDataProps) => {
    if (!data.name.trim() || !data.email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    onSubmit(data);
  };

  return !isAuthenticated ? (
    <form
      className="flex flex-col h-full justify-start"
      onSubmit={handleSubmit(submitForm)}
    >
      <div>
        <div className="text-primary flex flex-col justify-start">
          <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-normal text-gray_1">
            Name <span className="text-red-700">*</span>
          </label>
          <input
            className="border p-2 mb-4 w-full rounded-md bg-[#F5F5F5] border-[#E0E0E0] text-[16px] font-light"
            placeholder="Name"
            {...register("name", { required: true })}
            type="text"
            autoComplete="name"
          />
          {errors.name && (
            <span className="error-message text-red-400 text-xs font-light">This field is required</span>
          )}
        </div>

        <div className="text-primary">
          <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-normal text-gray_1">
            Email <span className="text-red-700">*</span>
          </label>
          <input
            className="border p-2 mb-4 w-full rounded-md bg-[#F5F5F5] border-[#E0E0E0] text-[16px] font-light"
            placeholder="Email"
            {...register("email", { 
              required: true,
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email"
              }
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
      </div>

      <div className="flex flex-col pt-10 gap-3 justify-center text-[12px]">
        <button
          type="submit"
          className="px-4 py-2 rounded-full w-full flex flex-row justify-center text-[16px] gap-2"
          style={{
            backgroundColor: !isValid ? "var(--disabled)" : "var(--secondary)",
            color: !isValid ? "var(--disabledText)" : "var(--primary)",
          }}
          disabled={!isValid || loading}
        >
          {loading ? <p>Loading...</p> : <p>Get Started</p>}
          <ArrowRight
            color={!isValid ? "var(--disabledText)" : "var(--primary)"}
          />
        </button>

        <p className="text-gray_3 w-full text-center py-1">OR</p>
        <GoogleAuth />
      </div>
      <ToastContainer />
    </form>
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default NewUserDataForm;