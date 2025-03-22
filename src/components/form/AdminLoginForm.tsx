import { useForm } from "react-hook-form";
import { ArrowRight, GoogleIcon } from "../../assets/icons/Icon";
import { ChangeEvent, useState } from "react";
import { AdminDataInformation, AdminDataProps } from "../../types/type";

const AdminLoginForm = ({ handleChange, handleSubmit }: AdminDataInformation) => {
  const [disabled, setDisabled] = useState(true)

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<AdminDataProps>({ mode: "onChange" });

  // Watching form fields
  const username = watch("username");
  const email = watch("email");
  const password = watch("password");


  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleChange(e);
    setDisabled(!username || !email || !password ? false : true);
  }

  const handleContinueWithGoogle = () => {
    console.log('continue with google');
  };

  return (
    <form className="flex flex-col h-full justify-start" onSubmit={handleSubmit}>
      <div>
        <div className=' text-primary flex flex-col justify-start '>
          <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-normal text-gray_1">Name <span className="text-red-700">*</span></label>
          <input
            className="border p-2 mb-4 w-full rounded-md bg-[#F5F5F5] border-[#E0E0E0] text-[16px] font-light"
            placeholder='Name'
            {...register("username", { required: true })}
            type="text"
            name="username"
            onChange={(e) => handleFieldChange(e)}
            required
          />
          {errors.username && <span className="error-message">This field is required</span>}
        </div>

        <div className='text-primary '>
          <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-normal text-gray_1">Email <span className="text-red-700">*</span></label>
          <input
            className="border p-2 mb-4 w-full rounded-md bg-[#F5F5F5] border-[#E0E0E0] text-[16px] font-light"
            placeholder='Email'
            {...register("email", { required: true })}
            type="text"
            name="email"
            // value={sectionData.name}
            onChange={(e) => handleFieldChange(e)}
            required
          />
          {errors.email && <span className="error-message">This field is required</span>}
        </div>

        <div className=' text-primary flex flex-col justify-start '>
          <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-normal text-gray_1">Password <span className="text-red-700">*</span></label>
          <input
            className="border p-2 mb-4 w-full rounded-md bg-[#F5F5F5] border-[#E0E0E0] text-[16px] font-light"
            placeholder=''
            {...register("password", { required: true })}
            type="text"
            name="password"
            onChange={(e) => handleFieldChange(e)}
            required
          />
          {errors.password && <span className="error-message">This field is required</span>}
        </div>
      </div>

      <div className="flex flex-col pt-10 gap-3 justify-center text-[12px]">
        {/* Submit button: Disabled until required fields are filled */}
        <button
          type="submit"
          className="px-4 py-2 rounded-full w-full flex flex-row justify-center text-[16px] gap-2"
          style={{
            backgroundColor: disabled ? 'var(--disabled)' : 'var(--secondary)',
            color: disabled ? 'var(--disabledText)' : 'var(--primary)',
          }}
          disabled={disabled}
        >
          <p>Login</p>
          <ArrowRight color={disabled ? 'var(--disabledText)' : 'var(--primary)'} />
        </button>

        <p className="text-gray_3 w-full text-center py-1">OR</p>

        <button onClick={() => handleContinueWithGoogle()} className="bg-primary text-white px-4 py-2 rounded-full w-full flex flex-row gap-2 justify-center text-[16px]">
          <GoogleIcon />
          <p>Continue with Google</p>
        </button>
      </div>
    </form>
  )
}

export default AdminLoginForm;