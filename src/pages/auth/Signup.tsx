import {
  FormBody,
  FormFoot,
  Input,
  SubmitButton,
} from "../../components/ui/Auth";

const SignUp = () => {
  return (
    <FormBody>
      <Input type="name" id="name" label="Name" />
      <Input type="email" id="email" label="Email" />
      <Input type="password" id="password" label="Password" />
      <div>
        <input type="checkbox" className="mr-1" />
        <span className="mb-11 text-sm">
          Save my email and pasword on this website
        </span>
      </div>
      <SubmitButton type="Create Account" />
      <FormFoot
        ques="Have an account?"
        option="Login"
        linkTo="/auth/user/signin"
      />
    </FormBody>
  );
};

export default SignUp;
