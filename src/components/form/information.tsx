import { Checkbox } from "radix-ui";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckIcon } from "../../assets/icons/Icon";
import { ChangeEvent, useState } from "react";
import { InformationDataProps, InformationProps } from "../../types/type";

const Information = ({ handleChange, handleSubmit, handleNext }: InformationProps) => {
    const [disabled, setDisabled] = useState(true)
    const {
        register,
        watch,
        formState: { errors },
    } = useForm<InformationDataProps>({ mode: "onChange" });

    // Watching form fields
    const name = watch("name");
    const email = watch("email");

    // Disable the button if any required field is empty
    const isDisabled = !name || !email;

    const [checked, setChecked] = useState(false)

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        handleChange(e, checked);
        setDisabled(!name || !email ? false : true);
        console.log(isDisabled, disabled);
    }

    const handleSaveInfo = (check: boolean) => {
        setChecked(check);
        setDisabled(!name || !email ? false : true);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('continue with google');
        handleSubmit(e);
        handleNext(e);
    };

    return (
        <form className="flex flex-col px-5 gap-7 h-fit justify-between" onSubmit={handleFormSubmit}>
            <div>
                <div className=' text-primary flex flex-col justify-start '>
                    <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-medium">Name <span className="text-red-700">*</span></label>
                    <input
                        className="border p-2 mb-4 w-full rounded-md bg-[#F5F5F5] border-[#E0E0E0] text-[16px] font-light"
                        placeholder='Name'
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        onChange={(e) => handleFieldChange(e)}
                        required
                    />
                    {errors.name && <span className="error-message">This field is required</span>}
                </div>

                <div className='text-primary '>
                    <label className="relative z-10 w-fit px-1 rounded-sm block text-[15px] font-medium">Email <span className="text-red-700">*</span></label>
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

                <div className="flex items-center">
                    <Checkbox.Root
                        className="flex size-[25px] appearance-none items-center justify-center border border-secondary rounded outline-none hover:bg-secondary"
                        id="c1"
                        name="saveInfo"
                        onCheckedChange={(checked) => handleSaveInfo(checked === true ? true : false)}
                    >
                        <Checkbox.Indicator className="text-primary">
                            <div className="bg-secondary">
                                <CheckIcon color="var(--primary)" />
                            </div>
                        </Checkbox.Indicator>
                    </Checkbox.Root>

                    <label
                        className="pl-[15px] text-[15px] leading-none text-primary font-normal"
                        htmlFor="c1"
                    >
                        Save my name and email on this website
                    </label>
                </div>
            </div>

            <div className="flex flex-col pt-10 items-end gap-3 justify-center text-[12px]">
                {/* Submit button: Disabled until required fields are filled */}
                <button
                    type="submit"
                    className="px-4 py-2 rounded-full w-full flex flex-row justify-center text-[16px] gap-2"
                    style={{
                        backgroundColor: disabled ? 'var(--disabled)' : 'var(--primary)',
                        color: disabled ? 'var(--disabledText)' : 'white',
                    }}
                    disabled={disabled}
                >
                    <p>Proceed</p>
                    <ArrowRight color={disabled ? 'var(--disabledText)' : 'white'} />
                </button>

            </div>
        </form>
    )
}

export default Information;