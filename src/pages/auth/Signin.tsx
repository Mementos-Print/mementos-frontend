import {
  AuthGoogle,
  FormBody,
  FormFoot,
  Input,
  SubmitButton,
} from "../../components/ui/Auth";
import { useState } from "react";
import { useSetSelected } from "../../hooks/useSetSelected";
import { login } from "./auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(Boolean);
  const setSelected = useSetSelected();
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    login(email, password)
      .then((res) => {
        const accessToken = res.accessToken;
        setSelected("accessToken", accessToken);
        navigate("/dashboard");
        // setSelected("isAuthenticated", true);
      })
      .catch((err) => {
        toast.error(err.response?.data.Error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <FormBody onSubmit={handleAuth}>
        <Input
          type="email"
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <p className="text-riaught mb-11">Forgot Password?</p> */}
        <SubmitButton type="Login" isLoading={loading} />
        <FormFoot
          ques="Don't have an account?"
          option="Create Account"
          linkTo="/auth/user/signup"
        />
        <AuthGoogle />
      </FormBody>
      <ToastContainer />
    </>
  );
};

export default SignIn;
