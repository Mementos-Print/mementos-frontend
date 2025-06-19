import { ArrowRight } from "../../assets/icons/Icon";

const SignUp = () => {
  return (
    <div className="py-9 px-4 bg-[#F5F5F5]">
      <form className="font-mediu flex flex-col gap-6 text-sm tracking-[0.2px]">
        <div className="flex flex-col gap-[4px]">
          <label htmlFor="email" className="text-[#212121]">
            Email <span className="text-[#C9EC81]">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="focus:outline-[#C9EC81] p-2 rounded-lg border-[#E0E0E0] border bg-[#F5F5F5]"
          />
        </div>
        <div className="flex flex-col gap-[4px]">
          <label htmlFor="password" className="text-[#212121]">
            Password <span className="text-[#C9EC81]">*</span>
          </label>
          <input
            type="password"
            id="password"
            className="focus:outline-[#C9EC81] p-2 rounded-lg border-[#E0E0E0] border bg-[#F5F5F5]"
          />
        </div>
        <p className="text-right">Forgot Password?</p>
        <div className="bg-[#C9EC81] rounded-[60px] py-2 text-lg flex items-center justify-center gap-focus:outline-[#C9EC81] 2">
          <button type="submit">Login </button>
          <ArrowRight />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
