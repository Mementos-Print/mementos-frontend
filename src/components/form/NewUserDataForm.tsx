import { useForm } from "react-hook-form";
import { ArrowRight } from "../../assets/icons/Icon";
import { ChangeEvent, useState } from "react";
import { NewUserDataInformation, NewUserDataProps } from "../../types/type";
import GoogleAuth from "../../pages/auth/GoogleAuth";
import { useAppState } from "../../hooks/useAppState";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../pages/auth/auth";
import { useSetSelected } from "../../hooks/useSetSelected";
import { toast, ToastContainer } from "react-toastify";

const NewUserDataForm = ({ handleChange,handleSubmit }: NewUserDataInformation) => {
  const setSelected = useSetSelected();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(Boolean);

  const [disabled, setDisabled] = useState(true);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<NewUserDataProps>({ mode: "onChange" });
  const { isAuthenticated } = useAppState();

  // Watching form fields
  const name = watch("name");
  const email = watch("email");

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleChange(e);
    setDisabled(!name || !email ? false : true);
  };
  console.log(name, email);
  // handle submit
  handleSubmit = async () => {
    setLoading(true);
    if (!name || !email) return;
    login(email,name)
      .then(({ accessToken }) => {
        setSelected("isAuthenticated", true);
        setSelected("accessToken", accessToken);
        navigate("/user/dashboard");
        console.log("Successfully logged in");
      })
      .catch((err) => {
        console.log(err)
        toast("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return !isAuthenticated ? (
    <form
      className="flex flex-col h-full justify-start"
      onSubmit={handleSubmit}
    >
      <div>
        <div className=" text-primary flex flex-col justify-start ">
          <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-normal text-gray_1">
            Name <span className="text-red-700">*</span>
          </label>
          <input
            className="border p-2 mb-4 w-full rounded-md bg-[#F5F5F5] border-[#E0E0E0] text-[16px] font-light"
            placeholder="Name"
            {...register("name", { required: true })}
            type="text"
            name="name"
            onChange={(e) => handleFieldChange(e)}
            required
          />
          {errors.name && (
            <span className="error-message">This field is required</span>
          )}
        </div>

        <div className="text-primary ">
          <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-normal text-gray_1">
            Email <span className="text-red-700">*</span>
          </label>
          <input
            className="border p-2 mb-4 w-full rounded-md bg-[#F5F5F5] border-[#E0E0E0] text-[16px] font-light"
            placeholder="Email"
            {...register("email", { required: true })}
            type="text"
            name="email"
            // value={sectionData.name}
            onChange={(e) => handleFieldChange(e)}
            required
          />
          {errors.email && (
            <span className="error-message">This field is required</span>
          )}
        </div>
      </div>

      <div className="flex flex-col pt-10 gap-3 justify-center text-[12px]">
        {/* Submit button: Disabled until required fields are filled */}
        <button
          type="submit"
          // onClick={handleSubmit}
          className="px-4 py-2 rounded-full w-full flex flex-row justify-center text-[16px] gap-2"
          style={{
            backgroundColor: disabled ? "var(--disabled)" : "var(--secondary)",
            color: disabled ? "var(--disabledText)" : "var(--primary)",
          }}
          disabled={disabled}
        >
          {loading ? <p>Loading...</p> : <p>Get Started</p>}
          <ArrowRight
            color={disabled ? "var(--disabledText)" : "var(--primary)"}
          />
        </button>

        <p className="text-gray_3 w-full text-center py-1">OR</p>

        {/* google auth func */}
        <GoogleAuth />
        {/* <button onClick={() => handleContinueWithGoogle()} className="bg-primary text-white px-4 py-2 rounded-full w-full flex flex-row gap-2 justify-center text-[16px]">
          <GoogleIcon />
          <p>Continue with Google</p>
        </button> */}
      </div>
      <ToastContainer />
    </form>
  ) : (
    <Navigate to="/user/dashboard" />
  );
};

export default NewUserDataForm;
