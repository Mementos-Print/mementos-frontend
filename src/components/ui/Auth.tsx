import { Link } from "react-router-dom";
import { ArrowRight } from "../../assets/icons/Icon";

interface FormBodyProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const FormBody = ({ children, onSubmit }: FormBodyProps) => {
  return (
    <div className="py-9 px-4 bg-[#F5F5F5]">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 text-sm tracking-[0.2px]"
      >
        {children}
      </form>
    </div>
  );
};

interface InputProps {
  type: string;
  id: string;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input = ({ type, id, label, value, onChange }: InputProps) => {
  return (
    <div className="flex flex-col gap-[4px]">
      <label htmlFor="email" className="text-[#212121]">
        {label} <span className="text-[#C9EC81]">*</span>
      </label>
      <input
        type={type}
        required
        id={id}
        className="focus:outline-[#C9EC81] p-2 rounded-lg border-[#E0E0E0] border bg-[#F5F5F5]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
interface SubmitButtonProps {
  type: string;
  clickEvent?: () => void;
  isLoading: boolean;
}
export const SubmitButton = ({
  type,
  clickEvent,
  isLoading,
}: SubmitButtonProps) => {
  return (
    <div
      onClick={clickEvent}
      className="bg-[#C9EC81] rounded-[60px] py-2 text-lg flex items-center justify-center gap-focus:outline-[#C9EC81]"
    >
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading ..." : type}
      </button>
      {!isLoading && <ArrowRight />}
    </div>
  );
};

interface FormFootProps {
  ques: string;
  option: string;
  linkTo: string;
}
export const FormFoot = ({ ques, option, linkTo }: FormFootProps) => {
  return (
    <>
      <p className="text-base font-normal text-center">
        {ques}{" "}
        <Link to={linkTo}>
          <span className="font-medium">{option}</span>
        </Link>
      </p>
    </>
  );
};
