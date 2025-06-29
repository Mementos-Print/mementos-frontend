import {
  FormBody,
  FormFoot,
  Input,
  SubmitButton,
} from "../../components/ui/Auth";

const SignIn = () => {
  return (
    <FormBody>
      <Input type="name" id="name" label="Name" />
      <Input type="email" id="email" label="Email" />
      <p className="text-right mb-11">Forgot Password?</p>
      <SubmitButton type="Login" />
      <FormFoot
        ques="Don't have an account?"
        option="Create Account"
        linkTo="/auth/user/signup"
      />
    </FormBody>
  );
};

export default SignIn;
